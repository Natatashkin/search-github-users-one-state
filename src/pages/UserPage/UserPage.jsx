import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchCurrentUser } from "../../hooks";
import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
  Spinner,
} from "../../components";
import styles from "./UserPage.module.scss";

const UserPage = ({ location, favoritesOptions, isUserPage }) => {
  const userViewRef = useRef(null);
  const { username } = useParams();
  const { userData, loading } = useFetchCurrentUser(username);
  const { login, avatar_url, name, public_repos, repos } = userData;

  return (
    <Container ref={userViewRef}>
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
            repos={repos}
            userViewRef={userViewRef}
          />
        </div>
      )}
    </Container>
  );
};

export default UserPage;
