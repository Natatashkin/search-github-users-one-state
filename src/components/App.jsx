import React, { useState, lazy, Suspense } from "react";
import { useEffect } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import SearchPage from "../pages/SearchPage/SearchPage";
import { useLocalStorage } from "../hooks";

const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FaforitesPage")
);
const UserPage = lazy(() => import("../pages/UserPage/UserPage"));

const App = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams("");
  const isUserPage = useMatch("/user/*");
  const isSearchPage = Boolean(useMatch("/"));
  const { favorites, setFavorites } = useLocalStorage("favorites", []);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");

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
              query={searchQuery}
              location={location}
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
