import React, { useState, useEffect, useCallback } from "react";
import * as ghApi from "../../api/ghApi";
import { INITIAL_STATE } from "../../constants/constants";
import Spinner from "../../components/Spinner/Spinner";
import UserRepos from "../../components/UserRepos/UserRepos";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./UserView.module.scss";

const UserView = ({ user, onFavClick, errorHandler }) => {
  const { login, avatar_url, name, public_repos } = user || {};
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const showRepos = Boolean(repos.length);

  const getUserRepos = useCallback(async (username) => {
    try {
      setLoading(true);
      const response = await ghApi.getUserRepos(username);
      if (response.code === "ERR_NETWORK") {
        throw new Error("You are offline. Try later!");
      }
      if (response?.response?.status === 401) {
        throw new Error("Authenticate, pleace!");
      }
      setRepos(response.data);
    } catch (error) {
      errorHandler(() => {
        return {
          ...INITIAL_STATE,
          error: error.message,
        };
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserRepos(login);
  }, [login]);

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <UserAvatar url={avatar_url} name={name} size="large" />
      </div>
      <PersonalInfo data={user} onFavClick={() => onFavClick(user)} />
      {loading && <Spinner size={7} />}
      {showRepos && <UserRepos reposQuantity={public_repos} repos={repos} />}
    </div>
  );
};

export default UserView;
