import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import Container from "./Container/Container";
import Header from "./Header/Header";
import { filterNewItems, addFavoriteStatus } from "../helpers";
import * as ghApi from "../api/ghApi";

const Spinner = lazy(() => import(`../components/Spinner/Spinner`));
const ErrorMessage = lazy(() =>
  import(`../components/ErrorMessage/ErrorMessage`)
);
const UsersListView = lazy(() =>
  import(`../views/UsersListView/UsersListView`)
);
const UserView = lazy(() => import(`../views/UserView/UserView`));
const ButtonToTop = lazy(() => import(`../components/ButtonToTop/ButtonToTop`));

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
  const [state, setState] = useState(initialState);
  const [loading, setIsLoading] = useState(false);
  const [showFavList, setShowFavList] = useState(false);
  const [showTopBtn, setShowButton] = useState(false);
  const scrollRef = useRef(null);

  const listToRender = showFavList ? favorites : state.list;
  const showMainSpinner = loading && state.page === 1;
  const showListSpinner = loading && state.page > 1;
  const showList = !showMainSpinner && !state.error;

  const handleGetQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleShowFavorites = (status) => {
    setShowFavList(status);
    setState((prev) => {
      return {
        ...prev,
        user: null,
      };
    });
  };

  const toggleFavoriteClick = (user) => {
    const isFavorite = Boolean(user.isFavorite);
    setFavorites((prevFavorites) => {
      const newUser = { ...user, isFavorite: !isFavorite };
      if (!isFavorite) {
        const newFavorites = [...prevFavorites, newUser];
        window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      } else {
        const newFavorites = prevFavorites.filter(({ id }) => id !== user.id);
        window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      }
    });

    setState((prevState) => {
      return {
        ...prevState,
        list: prevState.list.map((item) => {
          if (item.id === user.id) {
            item.isFavorite = !isFavorite;
          }
          return item;
        }),
      };
    });
  };

  const handleGetUser = (user) => {
    setState((prev) => {
      return {
        ...prev,
        user,
      };
    });
  };

  const getTotalPages = useCallback(({ total }) => {
    setState((prev) => {
      return { ...prev, totalPages: Math.ceil(total / PER_PAGE) };
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

        if (!total) {
          throw new Error(`No users with username "${query}"`);
        }
        const users = addFavoriteStatus(usersData, favorites);
        if (!state.totalPages) {
          getTotalPages({ total });
        }

        setState((prev) => {
          let newUniqueUsers = prev.list;
          if (!!newUniqueUsers.length) {
            newUniqueUsers = filterNewItems(prev.list, users);
          }
          return {
            ...prev,
            list: state.page > 1 ? [...prev.list, ...newUniqueUsers] : users,
          };
        });
      } catch (error) {
        console.log(error);
        setState(() => {
          return {
            ...initialState,
            error: error.message,
          };
        });
      }
      setIsLoading(false);
    },
    [state.totalPages, state.page, favorites]
  );

  const resetUsersState = () => {
    setState(initialState);
  };

  const resetError = () => {
    setState((prev) => {
      return { ...prev, error: "" };
    });
  };

  const handleScroll = ({
    target: { scrollHeight, scrollTop, clientHeight },
  }) => {
    const shouldUpdate = scrollHeight - Math.ceil(scrollTop) <= clientHeight;

    if (!shouldUpdate || loading) {
      return;
    }

    setState((prevState) => {
      if (prevState.totalPages === prevState.page) return prevState;
      return {
        ...prevState,
        page: prevState.page + 1,
      };
    });
  };
  const debouncedScroll = useDebouncedCallback(handleScroll, 150);

  const handleShowButtonTop = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 150) {
      setShowButton(true);
      return;
    }
    setShowButton(false);
  };

  const onScroll = useCallback(
    (e) => {
      handleShowButtonTop(e);
      if (!showFavList) {
        debouncedScroll(e);
      }
    },
    [debouncedScroll, showFavList]
  );

  const handleScrollTopClick = (ref, value) => {
    ref.current.scrollTo({
      top: value,
      behavior: "smooth",
    });
  };

  const getUserRepos = useCallback(
    async (username, per_page, page) => {
      try {
        setIsLoading(true);
        const response = await ghApi.getUserRepos(username, per_page, page);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    },
    [state.page]
  );

  useEffect(() => {
    if (query) {
      resetError();
      makeSearchQuery(query, state.page, PER_PAGE);
      return;
    }
    resetUsersState();
  }, [query, state.page]);

  useEffect(() => {
    if (state.user) {
      getUserRepos(state.user.login, 10, state.page);
    }
  }, [state.user]);

  return (
    <>
      <Header onGetQuery={handleGetQuery} onFavClick={handleShowFavorites} />
      <Container ref={scrollRef} onScroll={onScroll}>
        <Suspense>
          {showMainSpinner && <Spinner />}
          {state.error && <ErrorMessage message={state.error} />}

          {state?.user ? (
            <UserView user={state.user} onFavClick={toggleFavoriteClick} />
          ) : (
            showList && (
              <UsersListView
                list={listToRender}
                showListSpinner={showListSpinner}
                onGetUser={handleGetUser}
                onFavClick={toggleFavoriteClick}
              />
            )
          )}

          {showTopBtn && (
            <ButtonToTop onClick={() => handleScrollTopClick(scrollRef, 0)} />
          )}
        </Suspense>
      </Container>
    </>
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
