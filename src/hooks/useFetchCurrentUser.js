import { useState, useCallback, useEffect } from "react";
import * as ghApi from "../api/ghApi";

const PER_PAGE_REPOS = 10;

const useFetchCurrentUser = (username) => {
  const [userData, setUserData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPAges] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ghApi.getUser(username);
      const repos = await ghApi.getUserRepos(username, PER_PAGE_REPOS, page);
      setTotalPAges(response.public_repos);
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
