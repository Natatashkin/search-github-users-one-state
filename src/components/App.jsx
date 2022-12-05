import React, { useState, useCallback, useRef, lazy, Suspense } from "react";
import PageLayout from "./PageLayout/PageLayout";
import Container from "./Container/Container";
// import SearchView from "../views/SearchView/SearchView";
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
  const [userList, setUserList] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const showUserList = Boolean(userList.length);

  const handleGetQuery = useCallback(
    (value) => {
      if (!value && showUserList) {
        setUserList([]);
      }
      setQuery(value);
    },
    [userList]
  );

  const getTotalPages = useCallback(({ query, total }) => {
    let pagesCount = 0;
    if (pagesCount === total) {
      setError(`No users with username "${query}"`);
      setUserList([]);
      return;
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
        if (!usersData) {
          setIsLoading(false);
          setError("You are offline. Try later!");
          return;
        }
        getTotalPages({ query, total });

        if (page > 1) {
          setUserList((prevList) => {
            const newUniqueUsers = filterNewItems(prevList, usersData);
            return [...prevList, ...newUniqueUsers];
          });
          setIsLoading(false);
          return;
        }

        setUserList(usersData);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    },
    [getTotalPages, totalPages]
  );

  console.log("app render");

  useEffect(() => {
    if (query) {
      makeSearchQuery(query, page, PER_PAGE);
    }
  }, [query]);

  console.log(showUserList);

  return (
    <PageLayout>
      <Header onGetQuery={handleGetQuery} />
      <Container>
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {showUserList && (
          <Suspense>
            <SearchView
              list={userList}
              favoritesOptions={{ favorites, setFavorites }}
            />
          </Suspense>
        )}
      </Container>
    </PageLayout>
  );
};

export default App;
