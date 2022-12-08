import React, { useState, useEffect, useCallback } from "react";
import * as ghApi from "../../api/ghApi";
import { INITIAL_STATE } from "../../constants/constants";
import UserRepos from "../../components/UserRepos/UserRepos";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./UserView.module.scss";

const UserView = ({
  user,
  onFavClick,
  loadingHandler,
  loading,
  errorHandler,
}) => {
  const { login, avatar_url, name, public_repos } = user || {};
  const [repos, setRepos] = useState([]);

  const getUserRepos = useCallback(async (username) => {
    try {
      loadingHandler(true);
      const response = await ghApi.getUserRepos(username);
      if (response.code === "ERR_NETWORK") {
        throw new Error("You are offline. Try later!");
      }
      if (response?.response?.status === 401) {
        throw new Error("Authenticate, pleace!");
      }
      setRepos(response);
    } catch (error) {
      errorHandler(() => {
        return {
          ...INITIAL_STATE,
          error: error.message,
        };
      });
    }
    loadingHandler(false);
  }, []);

  useEffect(() => {
    getUserRepos(login);
  }, [login]);

  return (
    <>
      {!loading && (
        <div className={styles.container}>
          <div className={styles.avatarContainer}>
            <UserAvatar url={avatar_url} name={name} size="large" />
          </div>
          <PersonalInfo data={user} onFavClick={() => onFavClick(user)} />
          <UserRepos reposQuantity={public_repos} repos={repos} />
        </div>
      )}
    </>
  );
};

export default UserView;
