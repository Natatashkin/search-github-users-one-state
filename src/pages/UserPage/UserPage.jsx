import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchCurrentUser, useScroll } from "../../hooks";
import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
  Spinner,
} from "../../components";
import styles from "./UserPage.module.scss";

const UserPage = ({ favoritesOptions }) => {
  const scrollRef = useRef(null);
  const { username } = useParams();
  const {
    userData,
    loading,
    userRepos,
    setReposPage,
    showListSpinner,
    totalPages,
  } = useFetchCurrentUser(username);

  const { onScroll } = useScroll({
    pageHandler: setReposPage,
    totalPages,
    loading,
  });
  const { login, avatar_url, name, public_repos } = userData || {};
  const renderPage = Boolean(login && userRepos.length);

  return (
    <Container ref={scrollRef} onScroll={onScroll}>
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
            scrollRef={scrollRef}
            showListSpinner={showListSpinner}
          />
        </div>
      )}
    </Container>
  );
};

export default UserPage;
