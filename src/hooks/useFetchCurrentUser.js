import { useState, useCallback, useEffect } from "react";
import * as ghApi from "../api/ghApi";
import { filterNewItems } from "../helpers";

const PER_PAGE_REPOS = 10;

const useFetchCurrentUser = (username) => {
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [reposPage, setReposPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const showListSpinner = loading && reposPage > 1;
  const showList = !loading && userRepos.length > 0;

  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ghApi.getUser(username);
      setUserData(response);
      setTotalPages(() => {
        if (!response.public_repos) {
          return 0;
        }
        return Math.ceil(response.public_repos / PER_PAGE_REPOS);
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [username]);

  const getUserRepos = useCallback(async (name, per_page, page) => {
    try {
      setIsLoading(true);
      const repos = await ghApi.getUserRepos(name, per_page, page);
      setUserRepos((prevRepos) => [...prevRepos, ...repos]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userData) {
      getUserRepos(username, PER_PAGE_REPOS, reposPage);
    }
    // console.log(reposPage);
    // if (isUserData && totalPages) {
    //   getUserRepos(username, PER_PAGE_REPOS, reposPage);
    // }
  }, [reposPage, userData]);

  return {
    userData,
    loading,
    setReposPage,
    userRepos,
    showListSpinner,
  };
};

export default useFetchCurrentUser;
