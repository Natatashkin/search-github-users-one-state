import React, { useState, lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { Spinner } from "./Spinner";
// import SearchPage from "../pages/SearchPage/SearchPage";
// import UserPage from "../pages/UserPage/UserPage";
// import FavoritesPage from "../pages/FavoritesPage/FaforitesPage";
import { PageLayout } from "./PageLayout";

const SearchPage = lazy(() => import("../pages/SearchPage/SearchPage"));
const UserPage = lazy(() => import("../pages/UserPage/UserPage"));
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FaforitesPage")
);

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

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
};

export default App;
