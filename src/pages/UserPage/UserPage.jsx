import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const UserPage = ({ location, favoritesOptions }) => {
  const userViewRef = useRef(null);
  const { username } = useParams();
  const {
    userData,
    loading,
    userRepos,
    setReposPage,
    showListSpinner,
    showList,
  } = useFetchCurrentUser(username);
  const { login, avatar_url, name, public_repos } = userData || {};

  useEffect(() => {
    console.log("render");
  }, []);
  return (
    <Container
      ref={userViewRef}
      onScroll={(e) => {
        handleScroll(e, setReposPage);
      }}
    >
      {loading && <Spinner />}
      {login && (
        <div className={styles.container}>
          {/* <ButtonLinkContainer>
            <BackLink
              location={location}
              titlePart="to search"
              alternativePath="/search"
            />
          </ButtonLinkContainer> */}
          <div className={styles.avatarContainer}>
            <UserAvatar url={avatar_url} name={name} variant="large" />
          </div>
          <PersonalInfo data={userData} favoritesOptions={favoritesOptions} />
          <UserRepos
            reposQuantity={public_repos}
            repos={userRepos}
            userViewRef={userViewRef}
            showListSpinner={showListSpinner}
            showList={showList}
          />
        </div>
      )}
    </Container>
  );
};

export default UserPage;
