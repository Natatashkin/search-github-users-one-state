import React, { useRef, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchCurrentUser } from "../../hooks";

import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
  BackLink,
} from "../../components";
import {
  UserContainer,
  AvatarContainer,
  ButtonLinkContainer,
} from "./UserPage.styled";

const UserViewContainer = forwardRef(({ children }, ref) => {
  return <UserContainer ref={ref}>{children}</UserContainer>;
});

const UserPage = ({ location, favoritesOptions, isUserPage }) => {
  const userViewRef = useRef(null);
  const { username } = useParams();
  const { userData, loading } = useFetchCurrentUser(username);
  const { login, avatar_url, name, public_repos, repos } = userData;

  return (
    <Container isUserPage={isUserPage} ref={userViewRef}>
      {loading && <h3>Loading...</h3>}
      {login && (
        <>
          <ButtonLinkContainer>
            <BackLink
              location={location}
              titlePart="to search"
              alternativePath="/search"
            />
          </ButtonLinkContainer>
          <UserViewContainer ref={userViewRef}>
            <AvatarContainer>
              <UserAvatar url={avatar_url} name={name} />
            </AvatarContainer>
            <PersonalInfo data={userData} favoritesOptions={favoritesOptions} />
            <UserRepos
              reposQuantity={public_repos}
              repos={repos}
              userViewRef={userViewRef}
            />
          </UserViewContainer>
        </>
      )}
    </Container>
  );
};

export default UserPage;
