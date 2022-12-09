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
import { filterNewItems, addFavoriteStatus, setLocalStorage } from "../helpers";
import {
  INITIAL_STATE,
  USERS_PER_PAGE,
  FAVORITES_DATA,
} from "../constants/constants";
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

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [favorites, setFavorites] = useState(FAVORITES_DATA || []);
  const [query, setQuery] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showFavList, setShowFavList] = useState(false);
  const [showTopBtn, setShowButton] = useState(false);
  const scrollRef = useRef(null);

  const showSearch = !showFavList && Boolean(!state.user);
  const listToRender = showFavList ? favorites : state.list;
  const showMainSpinner = loading && state.page === 1;
  const showListSpinner = loading && state.page > 1;
  const showList = !showMainSpinner && !state.error && !state.user;

  const handleGetQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleGetUser = (user) => {
    setShowFavList(false);

    setState((prev) => {
      return {
        ...prev,
        user,
      };
    });
  };

  const handleFavClick = () => {
    setShowFavList((prev) => !prev);

    setState((prev) => {
      if (prev.user) {
        return {
          ...prev,
          user: null,
        };
      }
      return prev;
    });
  };

  const toggleFavoriteClick = (user) => {
    const isFavorite = Boolean(user.isFavorite);
    const newUser = { ...user, isFavorite: !isFavorite };

    setFavorites((prevFavorites) => {
      let newFavorites = [];
      if (!isFavorite) {
        newFavorites = [newUser, ...prevFavorites];
      } else {
        newFavorites = prevFavorites.filter(({ id }) => id !== user.id);
      }
      setLocalStorage(newFavorites);
      return newFavorites;
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
        user: prevState.user && { ...prevState.user, isFavorite: !isFavorite },
      };
    });
  };

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
        const { usersData, totalUsers } = response;

        if (!totalUsers) {
          throw new Error(`No users with username "${query}"`);
        }
        const users = addFavoriteStatus(usersData, favorites);
        if (!state.totalUsers) {
          setState((prevState) => {
            return {
              ...prevState,
              totalUsers,
            };
          });
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
        setState(() => {
          return {
            ...INITIAL_STATE,
            error: error.message,
          };
        });
      }
      setIsLoading(false);
    },
    [state.totalUsers, state.page, favorites]
  );

  const resetUsersState = () => {
    setState(INITIAL_STATE);
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
      const totalUsers = prevState.totalUsers;
      const userListLength = prevState.list.length;

      if (totalUsers === userListLength) return prevState;

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

  useEffect(() => {
    if (query) {
      resetError();
      makeSearchQuery(query, state.page, USERS_PER_PAGE);
      return;
    }
    resetUsersState();
  }, [query, state.page]);

  return (
    <>
      <Header
        onGetQuery={handleGetQuery}
        showSearch={showSearch}
        showFavList={showFavList}
        onFavClick={handleFavClick}
      />
      <Container ref={scrollRef} onScroll={onScroll}>
        <Suspense>
          {showMainSpinner && <Spinner />}
          {state.error && <ErrorMessage message={state.error} />}

          {state?.user && (
            <UserView
              user={state.user}
              onFavClick={toggleFavoriteClick}
              loadingHandler={setIsLoading}
              errorHandler={setState}
              loading={loading}
            />
          )}
          {showList && (
            <UsersListView
              list={listToRender}
              showListSpinner={showListSpinner}
              onGetUser={handleGetUser}
              onFavClick={toggleFavoriteClick}
            />
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
