import { useState, useCallback, useEffect } from "react";
import * as ghApi from "../api/ghApi";
import { filterNewItems } from "../helpers";

const PER_PAGE_REPOS = 10;

const useFetchCurrentUser = (username) => {
  const [userData, setUserData] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  const [reposPage, setReposPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const getTotalPages = useCallback(({ repos }) => {
    let pagesCount = 0;
    // if (pagesCount === total) {
    //   setError(`No users with username "${query}"`);
    //   setUserList([]);
    //   return;
    // }
    pagesCount = Math.ceil(repos.length / PER_PAGE_REPOS);
    console.log(pagesCount);
    setTotalPages(pagesCount);
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ghApi.getUser(username);
      const repos = await ghApi.getUserRepos(
        username,
        PER_PAGE_REPOS,
        reposPage
      );
      // getTotalPages(response.public_repos);

      // if (reposPage > 1) {
      //   setReposPage((prevRepos) => {
      //     const uniqueNewRepos = filterNewItems(prevRepos);
      //   });
      // }
      setUserData({ ...response, repos });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return { userData, loading };
};

export default useFetchCurrentUser;
