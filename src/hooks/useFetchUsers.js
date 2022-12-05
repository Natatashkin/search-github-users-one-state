import { useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { filterNewItems } from "../helpers";
import * as ghApi from "../api/ghApi";

const PER_PAGE = 15;

const useFetchUsers = ({ query }) => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");

  const showSpinner = loading && page < 2;
  const showError = error && !loading;
  const showUserList = Boolean(userList.length && searchQuery);
  const showListSpinner = loading && page > 1;

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

  const debouncedRequest = useDebouncedCallback(makeSearchQuery, 350);

  const resetSearchState = () => {
    setUserList([]);
    setTotalPages(0);
    setError("");
    setPage(1);
  };

  useEffect(() => {
    resetSearchState();
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      debouncedRequest(searchQuery, page, PER_PAGE);
      return;
    }

    setUserList([]);
  }, [searchQuery, page]);

  return {
    error,
    userList,
    showSpinner,
    showError,
    showUserList,
    showListSpinner,
    setPage,
    loading,
    totalPages,
  };
};

export default useFetchUsers;
