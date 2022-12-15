import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import * as ghApi from "../../api/ghApi";

import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./UserView.module.scss";

const Spinner = lazy(() => import("../../components/Spinner/Spinner"));
const Dropdown = lazy(() => import("../../components/Dropdown/Dropdown"));

const UserView = ({ user, onFavClick }) => {
  const { login, avatar_url, name, public_repos } = user || {};
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const showRepos = Boolean(repos.length);

  const getUserRepos = useCallback(async (username) => {
    setLoading(true);
    const response = await ghApi.getUserRepos(username);
    setRepos(response || []);
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
      <Suspense>
        {loading && <Spinner size={7} />}
        {showRepos && <Dropdown reposQuantity={public_repos} repos={repos} />}
        {!showRepos && !loading && (
          <div className={styles.noRepos}>
            <p className={styles.title}>
              Repositories:
              <span className={styles.quantity}>{public_repos}</span>
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default UserView;
