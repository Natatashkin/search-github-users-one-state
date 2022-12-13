import React, { useState, useCallback, useRef, lazy, Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import Spinner from "./Spinner/Spinner";
import { filterNewItems, addFavoriteStatus, setLocalStorage } from "../helpers";
import {
  INITIAL_STATE,
  USERS_PER_PAGE,
  FAVORITES_DATA,
  PAGE_STEP,
} from "../constants/constants";
import * as ghApi from "../api/ghApi";

// перенести состояние инпута в хедер ++
// объединить список с айтемами (юзерслист +,)
// перенести обработку ошибок в апи ++
// пересмотреть стейт
//    -убрать стейт ошибки, перенести в нотификашки
//    -пейджу и общее кол-во страниц вынести в реф объектом
// иконки передавать через проп
// пофиксить подгрузку страниц и отпавку запроса за юзерами при скроле репозиториев

// const Spinner = lazy(() => import(`../components/Spinner/Spinner`));

const Header = lazy(() => import("./Header/Header"));
const Container = lazy(() => import("./Container/Container"));

const UsersListView = lazy(() =>
  import(`../views/UsersListView/UsersListView`)
);
const UserView = lazy(() => import(`../views/UserView/UserView`));
const ButtonToTop = lazy(() => import(`../components/ButtonToTop/ButtonToTop`));

// const INITIAL_STATE = {
//   list: [],
//   user: null,
// };

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [favorites, setFavorites] = useState(FAVORITES_DATA || []);
  const [loading, setIsLoading] = useState(false);
  const [showFavList, setShowFavList] = useState(false);
  const [showTopBtn, setShowButton] = useState(false);
  const pageRef = useRef({ page: 1, totalUsers: 0 });
  const queryRef = useRef(null);
  const scrollRef = useRef(null);

  const showSearch = !showFavList && !state.user;
  const listToRender = showFavList ? favorites : state.list;
  const showSpinner = loading && Boolean(!state.list.length);

  // Reset state
  // const resetState = () => {
  //   setState(INITIAL_STATE);
  // };

  // User handler
  const handleGetUser = (user) => {
    setShowFavList(false);
    setState((prev) => ({ ...prev, user }));
  };

  // const makeSearchQuery = useCallback(
  //   async (query, page, per_page) => {
  //     setIsLoading(true);
  //     const response = await ghApi.searchUsers(query, page, per_page);
  // if (!response) {
  //   return;
  // }
  //     const { usersData, totalUsers } = response;
  //     if (!pageRef.current.totalPages) {
  //       pageRef.current.totalUsers = totalUsers;
  //     }

  //     const users = addFavoriteStatus(usersData, favorites);

  //     setState((prev) => {
  //       let newUniqueUsers = prev.list;
  //       if (newUniqueUsers.length) {
  //         newUniqueUsers = filterNewItems(prev.list, users);
  //       }
  //       return {
  //         ...prev,
  //         list: pageRef > 1 ? [...prev.list, ...newUniqueUsers] : users,
  //       };
  //     });

  //     setIsLoading(false);
  //   },
  //   [state.totalUsers, state.page, favorites]
  // );
  const request = async (query) => {
    queryRef.current = query;
    if (query?.length > 2) {
      setIsLoading(true);
      const response = await ghApi.searchUsers(query, pageRef.current.page);
      console.log(response);
      if (!response) {
        return;
      }
      const { usersData, totalUsers } = response;
      if (!pageRef.current.totalUsers) {
        pageRef.current.totalUsers = totalUsers;
      }

      const users = addFavoriteStatus(usersData, favorites);
      console.log(queryRef.current !== query);
      if (queryRef.current !== query) {
        pageRef.current.page = 1;
        setState((prevState) => {
          return {
            ...prevState,
            list: users,
          };
        });
      } else {
        pageRef.current.page += PAGE_STEP;
        setState((prevState) => {
          let newUniqueUsers = prevState.list;
          if (newUniqueUsers.length) {
            newUniqueUsers = filterNewItems(prevState.list, users);
          }
          return {
            ...prevState,
            list: [...prevState.list, ...newUniqueUsers],
          };
        });
      }
    }
    setIsLoading(false);
  };
  const debouncedQuery = useDebouncedCallback(request, 350);

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
    const totalUsers = pageRef.current.totalUsers;
    const userListLength = state.list.length;

    if (totalUsers > userListLength) {
      request(queryRef.current);
    }
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

  console.log(state);
  return (
    <Suspense fallback={<Spinner />}>
      <Header
        showSearch={showSearch}
        showFavList={showFavList}
        onSendRequest={debouncedQuery}
        onFavClick={handleFavClick}
        showBackButton={state.user}
        onBackButtonClick={handleBackButtonClick}
      />
      <Container ref={scrollRef} onScroll={onScroll}>
        {showSpinner && <Spinner />}
        {state?.user && (
          <UserView
            user={state.user}
            onFavClick={toggleFavoriteClick}
            errorHandler={setState}
          />
        )}
        {listToRender && (
          <UsersListView
            list={listToRender}
            // showListSpinner={showListSpinner}
            onGetUser={handleGetUser}
            onFavClick={toggleFavoriteClick}
          />
        )}
        {showTopBtn && (
          <ButtonToTop onClick={() => handleScrollTopClick(scrollRef, 0)} />
        )}
        <Toaster
          containerStyle={{
            position: "absolute",
            top: "10px",
          }}
        />
      </Container>
    </Suspense>
  );
};

export default App;
