import React, { useRef, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchCurrentUser } from "../../hooks";

import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
  Spinner,
} from "../../components";
import { UserContainer } from "./UserPage.styled";
import styles from "./UserPage.module.scss";

const UserViewContainer = forwardRef(({ children }, ref) => {
  return <UserContainer ref={ref}>{children}</UserContainer>;
});

const UserPage = ({ location, favoritesOptions, isUserPage }) => {
  const userViewRef = useRef(null);
  const { username } = useParams();
  const { userData, loading } = useFetchCurrentUser(username);
  const { login, avatar_url, name, public_repos, repos } = userData;

  return (
    <Container ref={userViewRef}>
      {loading && <Spinner />}
      {login && (
        <>
          {/* <ButtonLinkContainer>
            <BackLink
              location={location}
              titlePart="to search"
              alternativePath="/search"
            />
          </ButtonLinkContainer> */}
          {/* <UserViewContainer ref={userViewRef}> */}
          <div className={styles.avatarContainer}>
            <UserAvatar url={avatar_url} name={name} variant="large" />
          </div>
          <PersonalInfo data={userData} favoritesOptions={favoritesOptions} />
          <UserRepos
            reposQuantity={public_repos}
            repos={repos}
            userViewRef={userViewRef}
          />
          {/* </UserViewContainer> */}
        </>
      )}
    </Container>
  );
};

export default UserPage;
