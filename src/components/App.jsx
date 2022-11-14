import React, { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { useLocalStorage, useFetchUsers } from "../hooks";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserPage from "../pages/UserPage/UserPage";
import FavoritesPage from "../pages/FavoritesPage/FaforitesPage";
import { PageLayout } from "./PageLayout";

const App = () => {
  const listRef = useRef(null);
  const location = useLocation();
  const [searchParams] = useSearchParams("");
  const { favorites, setFavorites } = useLocalStorage("favorites", []);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [showButton, setShowButton] = useState(false);
  const { searchPageOptions, setPage } = useFetchUsers({
    query: searchQuery,
    setShowButton,
  });
  const favoritesOptions = { favorites, setFavorites };

  const getQuery = (query) => {
    setSearchQuery(query);
  };

  const getUserName = () => {};

  const handleScroll = useCallback(
    ({ target }) => {
      const shouldUpdate =
        target.scrollHeight - Math.ceil(target.scrollTop) <=
        target.clientHeight;

      if (shouldUpdate) {
        setPage((prevPage) => {
          return prevPage + 1;
        });
      }
    },
    [setPage]
  );

  const handleScrollToTop = () => {
    listRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Routes>
      <Route path="/" element={<PageLayout onGetQuery={getQuery} />}>
        <Route index element={<HomePage />} />
        <Route
          path="/search"
          element={
            <SearchPage
              searchPageOptions={searchPageOptions}
              showButton={showButton}
              location={location}
              handleScroll={handleScroll}
              handleScrollToTop={handleScrollToTop}
              ref={listRef}
              favoritesOptions={favoritesOptions}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/user/:username"
          element={
            <UserPage location={location} favoritesOptions={favoritesOptions} />
          }
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favoritesOptions={favoritesOptions} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
