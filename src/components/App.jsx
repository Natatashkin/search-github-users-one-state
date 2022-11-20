import React, { useState, useCallback } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { useLocalStorage, useFetchUsers } from "../hooks";
// import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
// import Dashboard from "../pages/Dashboard/Dashboard";
import UserPage from "../pages/UserPage/UserPage";
import FavoritesPage from "../pages/FavoritesPage/FaforitesPage";
import { PageLayout } from "./PageLayout";

const App = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams("");
  const isUserPage = useMatch("/user/*");
  const isSearchPage = Boolean(useMatch("/"));
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

  const handleScroll = useCallback(
    ({ target: { scrollHeight, scrollTop, clientHeight } }) => {
      const shouldUpdate = scrollHeight - Math.ceil(scrollTop) <= clientHeight;

      if (shouldUpdate) {
        setPage((prevPage) => {
          return prevPage + 1;
        });
      }
    },
    [setPage]
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout
            onGetQuery={getQuery}
            location={location}
            searchParams={searchParams}
            isUserPage={isUserPage}
            isSearchPage={isSearchPage}
          />
        }
      >
        <Route
          index
          element={
            <SearchPage
              searchPageOptions={searchPageOptions}
              showButton={showButton}
              location={location}
              handleScroll={handleScroll}
              favoritesOptions={favoritesOptions}
            />
          }
        />
        <Route
          path="user/:username"
          element={
            <UserPage location={location} favoritesOptions={favoritesOptions} />
          }
        />
        <Route
          path="favorites"
          element={
            <FavoritesPage
              location={location}
              favoritesOptions={favoritesOptions}
              isUserPage={isUserPage}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
