import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import * as ghApi from "../api/ghApi";

const PER_PAGE = 15;

const useFetchUsers = () => {
  const { searchQuery: query } = useOutletContext();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");

  const showSpinner = loading && page < 2;
  const showError = error && !loading;
  const showUserList = userList && searchQuery;
  const showListSpinner = loading && page > 1;

  const getTotalPages = useCallback(
    (totalCount) => {
      let pagesCount = 0;
      if (pagesCount === totalCount) {
        setError(`No users with username "${searchQuery}"`);
        return;
      }
      pagesCount = Math.ceil(totalCount / PER_PAGE);
      setTotalPages(pagesCount);
    },
    [searchQuery]
  );

  const makeSearchQuery = useCallback(
    async (data, page, per_page) => {
      setError("");
      try {
        setIsLoading(true);
        const { usersData, total } = await ghApi.searchUsers(
          data,
          page,
          per_page
        );
        getTotalPages(total);

        if (page > 1) {
          setUserList((prevList) => {
            return [...prevList, ...usersData];
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
    [getTotalPages]
  );

  const debouncedRequest = useDebouncedCallback(makeSearchQuery, 350);

  const resetSearchState = () => {
    setUserList([]);
    setTotalPages(0);
    setPage(1);
    //   setShowButton(false);
  };

  useEffect(() => {
    setSearchQuery(query);
    resetSearchState();
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      // setSearchParams({ q: searchQuery });

      if (totalPages > 0 && totalPages < page) {
        //   setShowButton(true);
        return;
      }
      debouncedRequest(searchQuery, page, PER_PAGE);
      return;
    }
    // removeSearchParams();
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
  };
};

export default useFetchUsers;
