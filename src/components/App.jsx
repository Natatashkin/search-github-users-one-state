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
  HEADER_TITLES,
} from "../constants/constants";
import * as ghApi from "../api/ghApi";

// перенести состояние инпута в хедер
// сделать юзер репос одним компоненотом
// сделать списки и айтемы одним компонентом
// перенести обработку ошибок в апи
// пересмотреть стейт
//    -убрать стейт ошибки, перенести в нотификашки
//    -пейджу и общее кол-во страниц вынести в реф объектом
// иконки передавать через проп
// пофиксить подгрузку страниц и отпавку запроса за юзерами при скроле репозиториев

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

  const showSearch = !showFavList && !state.user;
  const listToRender = showFavList ? favorites : state.list;
  const showMainSpinner = loading && state.page === 1;
  const showListSpinner = loading && state.page > 1;
  //поменять условие showList
  const showList = !showMainSpinner && !state.error && !state.user;
  const title = showFavList
    ? HEADER_TITLES.favorites
    : showSearch
    ? HEADER_TITLES.search
    : HEADER_TITLES.user;

  // User handler
  const handleGetUser = (user) => {
    setShowFavList(false);
    setState((prev) => ({ ...prev, user }));
  };

  // Reset handlers
  const resetUsersState = () => {
    setState(INITIAL_STATE);
  };
  const resetError = () => {
    setState((prev) => {
      return { ...prev, error: "" };
    });
  };

  // Input handlers
  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };
  const makeSearchQuery = useCallback(
    async (query, page, per_page) => {
      try {
        setIsLoading(true);
        const response = await ghApi.searchUsers(query, page, per_page);
        debugger;
        // remove all errors from try block to api function
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
          if (newUniqueUsers.length) {
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
  const debouncedQuery = useDebouncedCallback(makeSearchQuery, 350);
  useEffect(() => {
    if (query && query.length > 2) {
      resetError();
      debouncedQuery(query, state.page, USERS_PER_PAGE);
      return;
    }
    resetUsersState();
  }, [query, state.page]);

  // BackButton handlers
  const handleBackButtonClick = () => {
    setShowButton(false);
    setState((prevState) => {
      return {
        ...prevState,
        user: null,
      };
    });
  };

  // Favorites handlers
  const handleFavClick = () => {
    setShowFavList((prev) => !prev);
    if (!state.user) {
      return;
    }
    setState((prev) => ({ ...prev, user: null }));
  };

  const toggleFavoriteClick = (user) => {
    const isFavorite = Boolean(user.isFavorite);
    const newUser = { ...user, isFavorite: !isFavorite };

    setFavorites((prevFavorites) => {
      const newFavorites = [];
      if (!isFavorite) {
        newFavorites = [newUser, ...prevFavorites];
      } else {
        newFavorites = prevFavorites.filter(({ id }) => id !== user.id);
      }
      setLocalStorage(newFavorites);
      return newFavorites;
    });

    setState((prevState) => {
      const list = prevState.list.map((item) => {
        if (item.id === user.id) {
          return {
            ...item,
            isFavorite: !isFavorite,
          };
        }
        return item;
      });
      return {
        ...prevState,
        list,
        user: prevState.user
          ? { ...prevState.user, isFavorite: !isFavorite }
          : null,
      };
    });
  };

  // Scroll handlers
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

  const onScroll = useCallback(
    (e) => {
      handleShowButtonTop(e);
      if (!showFavList) {
        debouncedScroll(e);
      }
    },
    [debouncedScroll, showFavList]
  );

  // ScrollToTop button handlers
  const handleShowButtonTop = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 150) {
      setShowButton(true);
      return;
    }
    setShowButton(false);
  };

  const handleScrollTopClick = (ref, value) => {
    ref.current.scrollTo({
      top: value,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header
        query={query}
        onChange={handleInputChange}
        showSearch={showSearch}
        showFavList={showFavList}
        onFavClick={handleFavClick}
        showBackButton={state.user}
        onBackButtonClick={handleBackButtonClick}
        title={title}
      />
      <Container ref={scrollRef} onScroll={onScroll}>
        {/* Suspens показывает предварительную загрузку даже без условий */}
        {/* <Suspense fallback={<Spinner />}> */}
        <Suspense>
          {showMainSpinner && <Spinner />}
          {state.error && <ErrorMessage message={state.error} />}
          {state?.user && (
            <UserView
              user={state.user}
              onFavClick={toggleFavoriteClick}
              errorHandler={setState}
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
