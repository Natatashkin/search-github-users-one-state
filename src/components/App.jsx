import React, { useState, useCallback, useRef, lazy, Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import Spinner from "./Spinner/Spinner";
import { filterNewItems, addFavoriteStatus, setLocalStorage } from "../helpers";
import {
  INITIAL_STATE,
  FAVORITES_DATA,
  PAGE_STEP,
} from "../constants/constants";
import * as ghApi from "../api/ghApi";

const Header = lazy(() => import("./Header/Header"));
const Container = lazy(() => import("./Container/Container"));

const UsersListView = lazy(() =>
  import(`../views/UsersListView/UsersListView`)
);
const UserView = lazy(() => import(`../views/UserView/UserView`));
const ButtonToTop = lazy(() => import(`../components/ButtonToTop/ButtonToTop`));

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [favorites, setFavorites] = useState(FAVORITES_DATA || []);
  const [loading, setIsLoading] = useState(false);
  const [showFavList, setShowFavList] = useState(false);
  const [showTopBtn, setShowButton] = useState(false);
  const pageRef = useRef({
    page: 1,
    totalUsers: 0,
  });
  const queryRef = useRef(null);
  const scrollRef = useRef(null);

  const showSearch = !showFavList && !state.user;
  const listToRender = showFavList ? favorites : state.list;
  const showSpinner = loading && Boolean(!state.list.length);
  const showListSpinner = loading && Boolean(state.list.length);
  const isEndOfList =
    Boolean(state.list.length) &&
    pageRef.current.totalUsers === state.list.length;

  // Reset state
  const resetState = () => {
    queryRef.current = null;
    pageRef.current = {
      page: 1,
      totalUsers: 0,
    };
    setState(INITIAL_STATE);
  };

  // User handler
  const handleGetUser = (user) => {
    setShowFavList(false);
    setState((prev) => ({ ...prev, user }));
  };

  const request = async (query) => {
    if (!query) {
      resetState();
      return;
    }
    if (query.length > 2) {
      if (queryRef.current !== query) {
        resetState();
        console.log("reset state, change query");
      } else {
        pageRef.current.page += PAGE_STEP;
      }
      setIsLoading(true);
      queryRef.current = query;
      const response = await ghApi.searchUsers(query, pageRef.current.page);

      if (!response) {
        setIsLoading(false);
        return;
      }
      const { usersData, totalUsers } = response;
      if (!pageRef.current.totalUsers) {
        pageRef.current.totalUsers = totalUsers;
      }
      const users = addFavoriteStatus(usersData, favorites);
      setState((prevState) => {
        const hasStateList = Boolean(prevState.list.length);
        const newList = hasStateList
          ? [...prevState.list, ...filterNewItems(prevState.list, users)]
          : users;

        return {
          ...prevState,
          list: newList,
        };
      });
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
    console.log(state.user);
    if (!state.user) {
      return;
    }
    setState((prev) => ({ ...prev, user: null }));
  };

  const toggleFavoriteClick = (user) => {
    const isFavorite = Boolean(user.isFavorite);
    const newUser = { ...user, isFavorite: !isFavorite };

    setFavorites((prevFavorites) => {
      const newFavorites = isFavorite
        ? prevFavorites.filter(({ id }) => id !== user.id)
        : [newUser, ...prevFavorites];
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
      if (showSearch) {
        debouncedScroll(e);
      }
    },
    [debouncedScroll, showSearch]
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
    <Suspense fallback={<Spinner />}>
      <Header
        showSearch={showSearch}
        showFavList={showFavList}
        onSendRequest={debouncedQuery}
        onFavClick={handleFavClick}
        showBackButton={Boolean(state.user)}
        onBackButtonClick={handleBackButtonClick}
      />
      <Container ref={scrollRef} onScroll={onScroll}>
        {showSpinner && <Spinner />}
        {state?.user && (
          <UserView user={state.user} onFavClick={toggleFavoriteClick} />
        )}
        {listToRender && !state.user && (
          <UsersListView
            list={listToRender}
            onGetUser={handleGetUser}
            onFavClick={toggleFavoriteClick}
            showListSpinner={showListSpinner}
            isEndOfList={isEndOfList}
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
