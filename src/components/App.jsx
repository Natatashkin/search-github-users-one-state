import React, { useState, useCallback, useRef, lazy, Suspense } from "react";
import PageLayout from "./PageLayout/PageLayout";
import Container from "./Container/Container";
import Header from "./Header/Header";
import { useFetchUsers, useScroll } from "../hooks";
import { useLocalStorage } from "../hooks";
import Spinner from "./Spinner/Spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { filterNewItems } from "../helpers";
import * as ghApi from "../api/ghApi";
import { useEffect } from "react";

const SearchView = lazy(() => import("../views/SearchView/SearchView"));

const favs = JSON.parse(window.localStorage.getItem("favorites"));
const PER_PAGE = 15;

const App = () => {
  const [favorites, setFavorites] = useState(favs || []);
  const [query, setQuery] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const isUsersList = Boolean(usersList.length);
  const showUsersList = query && isUsersList;

  const handleGetQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  const getTotalPages = useCallback(({ query, total }) => {
    let pagesCount = 0;
    if (pagesCount === total) {
      setUsersList([]);
      throw new Error(`No users with username "${query}"`);
    }
    pagesCount = Math.ceil(total / PER_PAGE);
    setTotalPages(pagesCount);
  }, []);

  const makeSearchQuery = useCallback(
    async (query, page, per_page) => {
      try {
        setIsLoading(true);
        const { usersData, total } = await ghApi.searchUsers(
          query,
          page,
          per_page
        );
        getTotalPages({ query, total });
        if (!usersData) {
          setIsLoading(false);
          throw new Error("You are offline. Try later!");
        }

        if (page > 1) {
          setUsersList((prevList) => {
            const newUniqueUsers = filterNewItems(prevList, usersData);
            return [...prevList, ...newUniqueUsers];
          });
          setIsLoading(false);
          return;
        }

        setUsersList(usersData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [getTotalPages, totalPages]
  );

  const resetUsersState = () => {
    setUsersList([]);
    setPage(1);
    setTotalPages(0);
    setError("");
  };

  useEffect(() => {
    if (query) {
      resetUsersState();
      makeSearchQuery(query, page, PER_PAGE);
      return;
    }
    resetUsersState();
  }, [query]);

  return (
    <PageLayout>
      <Header onGetQuery={handleGetQuery} />
      <Container>
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {showUsersList && (
          <Suspense>
            <SearchView
              list={query ? usersList : []}
              favoritesOptions={{ favorites, setFavorites }}
            />
          </Suspense>
        )}
      </Container>
    </PageLayout>
  );
};

export default App;
