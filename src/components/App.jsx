import React, { useState, useCallback, useRef, lazy, Suspense } from "react";
import PageLayout from "./PageLayout/PageLayout";
import Container from "./Container/Container";
import SearchView from "../views/SearchView/SearchView";
import Header from "./Header/Header";
import { useFetchUsers, useScroll } from "../hooks";
import { useLocalStorage } from "../hooks";
import Spinner from "./Spinner/Spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const App = () => {
  const [query, setQuery] = useState("");
  const { favorites, setFavorites } = useLocalStorage("favorites", []);
  const favoritesOptions = { favorites, setFavorites };
  const scrollRef = useRef(null);

  const handleGetQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  console.log("App query", query);

  return (
    <PageLayout>
      <Header onGetQuery={handleGetQuery} />
      <Container></Container>
    </PageLayout>
  );
};

export default App;
