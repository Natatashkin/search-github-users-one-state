import React, {
  useState,
  useCallback,
  useRef,
  lazy,
  Suspense,
  useMemo,
} from "react";
import PageLayout from "./PageLayout/PageLayout";
import Container from "./Container/Container";
import Header from "./Header/Header";
import { useFetchUsers, useScroll } from "../hooks";
import { useLocalStorage } from "../hooks";
import Spinner from "./Spinner/Spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { filterNewItems, addFavoriteStatus } from "../helpers";
import * as ghApi from "../api/ghApi";
import { useEffect } from "react";

// const SearchView = lazy(() => import("../views/SearchView/SearchView"));
// const FavoritesView = lazy(() =>
//   import("../views/FavoritesView/FavoritesView")
// );

const UsersListView = lazy(() =>
  import("../views/UsersListView/UsersListView")
);
const UserView = lazy(() => import("../views/UserView/UserView"));

const favs = JSON.parse(window.localStorage.getItem("favorites"));
const PER_PAGE = 15;

const initialState = {
  list: [],
  user: null,
  page: 1,
  totalPages: 0,
  error: "",
};

const App = () => {
  const [favorites, setFavorites] = useState(favs || []);
  const [query, setQuery] = useState("");
  const [searchState, setSearchState] = useState(initialState);
  const [loading, setIsLoading] = useState(false);
  const [showFavList, setShowFavList] = useState(false);
  const scrollRef = useRef(null);
  const listToRender = useMemo(
    () => (showFavList ? favorites : searchState.list),
    [showFavList, favorites, searchState?.list]
  );

  const handleGetQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleShowFavorites = (state) => {
    setShowFavList(state);
    setSearchState((prev) => {
      return {
        ...prev,
        user: null,
      };
    });
  };

  const handleFavClick = () => {};

  const handleGetUser = (user) => {
    setSearchState((prev) => {
      return {
        ...prev,
        user,
      };
    });
  };

  const getTotalPages = useCallback(({ query, total }) => {
    let pagesCount = 0;
    if (pagesCount === total) {
      throw new Error(`No users with username "${query}"`);
    }
    pagesCount = Math.ceil(total / PER_PAGE);
    setSearchState((prev) => {
      return { ...prev, totalPages: pagesCount };
    });
  }, []);

  const makeSearchQuery = useCallback(
    async (query, page, per_page) => {
      try {
        setIsLoading(true);
        const response = await ghApi.searchUsers(query, page, per_page);
        if (response.code === "ERR_NETWORK") {
          throw new Error("You are offline. Try later!");
        }
        if (response?.response?.status === 401) {
          throw new Error("Authenticate, pleace!");
        }

        const { usersData, total } = response;
        if (!searchState.totalPages) {
          getTotalPages({ query, total });
        }

        const users = addFavoriteStatus(usersData, favorites);
        setSearchState((prev) => {
          const newUniqueUsers = filterNewItems(prev.list, users);
          return {
            ...prev,
            list:
              searchState.page > 1 ? [...prev.list, ...newUniqueUsers] : users,
          };
        });
      } catch (error) {
        setSearchState((prev) => {
          return {
            ...prev,
            error: error.message,
          };
        });
      }
      setIsLoading(false);
    },
    [searchState.totalPages, searchState.page, favorites]
  );

  const resetUsersState = () => {
    setSearchState(initialState);
  };

  useEffect(() => {
    if (query) {
      resetUsersState();
      makeSearchQuery(query, searchState.page, PER_PAGE);
      return;
    }
    resetUsersState();
  }, [query, searchState.page]);

  return (
    <PageLayout>
      <Header onGetQuery={handleGetQuery} onFavClick={handleShowFavorites} />
      <Container>
        {loading && <Spinner />}
        {searchState.error && <ErrorMessage message={searchState.error} />}
        <Suspense>
          {searchState?.user ? (
            <UserView user={searchState.user} />
          ) : (
            <UsersListView list={listToRender} onGetUser={handleGetUser} />
          )}
        </Suspense>
      </Container>
    </PageLayout>
  );
};

export default App;

// const handleFavView = (user) => {
//   const isFavUser = Boolean(user?.isFavorite);
//   const data = JSON.parse(localStorage.getItem("favorites"));
//   setFavorites((prev) => {
//     if (user.isFavorite) {
//       const newData = data.filter(({ id }) => user.id !== id);
//       localStorage.setItem("favorites", JSON.stringify(newData));
//     } else {
//       const newData = [...data, user];
//       localStorage.setItem("favorites", JSON.stringify(newData));
//     }

//     return prev.map((item) => ({ ...item, isFavorite: !isFavUser }));
//   });

//   setSearchState((prev) => {
//     return {
//       ...prev,
//       list: prev.list.map((item) => ({ ...item, isFavorite: !isFavUser })),
//     };
//   });
// };
