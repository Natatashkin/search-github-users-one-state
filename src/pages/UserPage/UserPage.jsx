import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useFetchCurrentUser } from "../../hooks";
import { handleScroll } from "../../helpers";
import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
  Spinner,
} from "../../components";
import styles from "./UserPage.module.scss";

const UserPage = ({ favoritesOptions }) => {
  const userViewRef = useRef(null);
  const { username } = useParams();
  const { userData, loading, userRepos, setReposPage, showListSpinner } =
    useFetchCurrentUser(username);
  const { login, avatar_url, name, public_repos } = userData || {};
  const renderPage = login && userRepos.length > 0;

  const debouncedScroll = useDebouncedCallback((e) => {
    handleScroll(e, setReposPage, loading);
  }, 350);

  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <Container ref={userViewRef} onScroll={debouncedScroll}>
      {loading && <Spinner />}
      {renderPage && (
        <div className={styles.container}>
          <div className={styles.avatarContainer}>
            <UserAvatar url={avatar_url} name={name} variant="large" />
          </div>
          <PersonalInfo data={userData} favoritesOptions={favoritesOptions} />
          <UserRepos
            reposQuantity={public_repos}
            repos={userRepos}
            userViewRef={userViewRef}
            showListSpinner={showListSpinner}
          />
        </div>
      )}
    </Container>
  );
};

export default UserPage;
