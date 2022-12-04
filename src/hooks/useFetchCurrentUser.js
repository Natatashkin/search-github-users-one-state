import { useState, useCallback, useEffect } from "react";
import * as ghApi from "../api/ghApi";

const PER_PAGE_REPOS = 10;

const useFetchCurrentUser = (username) => {
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [reposPage, setReposPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const showListSpinner = loading && reposPage > 1;

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
      setError("You are offline. Try later!");
    }
    setIsLoading(false);
  }, [username]);

  const getUserRepos = useCallback(async (name, per_page, page) => {
    try {
      setIsLoading(true);
      const repos = await ghApi.getUserRepos(name, per_page, page);
      setUserRepos((prevRepos) => [...prevRepos, ...repos]);
    } catch (error) {
      setError("You are offline. Try later!");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userData) {
      if (totalPages < reposPage) return;
      getUserRepos(username, PER_PAGE_REPOS, reposPage);
    }
  }, [getUserRepos, reposPage, userData, username, totalPages]);

  return {
    userData,
    loading,
    setReposPage,
    userRepos,
    showListSpinner,
    totalPages,
    error,
  };
};

export default useFetchCurrentUser;
