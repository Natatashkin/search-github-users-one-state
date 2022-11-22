import React, { useState, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { useLocalStorage, useFetchUsers } from "../hooks";
import { handleScroll } from "../helpers";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserPage from "../pages/UserPage/UserPage";
import FavoritesPage from "../pages/FavoritesPage/FaforitesPage";
import { PageLayout } from "./PageLayout";

const App = () => {
  const location = useLocation();
  // const scrollRef = useRef();
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

  useEffect(() => {
    console.log("render app");
  }, []);

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
              onScroll={(e) => handleScroll(e, setPage)}
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
