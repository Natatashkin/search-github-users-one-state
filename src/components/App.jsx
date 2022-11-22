import React, { useState } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { useLocalStorage, useFetchUsers, useScroll } from "../hooks";
import SearchPage from "../pages/SearchPage/SearchPage";
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
  const { searchPageOptions, setPage, loading } = useFetchUsers({
    query: searchQuery,
  });
  const { showTopBtn, onScroll } = useScroll(setPage, loading);
  const favoritesOptions = { favorites, setFavorites };

  const getQuery = (query) => {
    setSearchQuery(query);
  };

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
              showTopBtn={showTopBtn}
              location={location}
              onScroll={onScroll}
              // onScroll={(e) => handleScroll(e, setPage)}
              favoritesOptions={favoritesOptions}
            />
          }
        />
        <Route
          path="user/:username"
          element={<UserPage favoritesOptions={favoritesOptions} />}
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
