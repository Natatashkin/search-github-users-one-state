import React, { useState, useCallback, lazy, Suspense } from "react";
import PageLayout from "./PageLayout/PageLayout";
import Header from "./Header/Header";
import SearchPage from "../pages/SearchPage/SearchPage";
import { useLocalStorage } from "../hooks";

const App = () => {
  const [query, setQuery] = useState("");
  const { favorites, setFavorites } = useLocalStorage("favorites", []);
  const favoritesOptions = { favorites, setFavorites };

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
  }, []);

  return (
    <PageLayout>
      <Header query={query} onChange={handleOnChange} />
    </PageLayout>
  );
};

export default App;
