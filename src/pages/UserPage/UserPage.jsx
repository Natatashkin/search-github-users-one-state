import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useFetchCurrentUser } from "../../hooks";
// import * as ghApi from "../../api/ghApi";
import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
} from "../../components";
import { BackLink, UserContainer, AvatarContainer } from "./UserPage.styled";

const UserPage = ({ location, favoritesOptions }) => {
  const { username } = useParams();
  const { userData, loading } = useFetchCurrentUser(username);
  const { login, avatar_url, name, public_repos, repos } = userData;

  // Спросить Андрея как работает возврат запроса в инпут?????
  return (
    <Container>
      {loading && <h3>Loading...</h3>}
      {login && (
        <>
          <BackLink to={location?.state?.from || "/search"}>
            <IoArrowBack />
            <span>
              Back <span> to search</span>{" "}
            </span>
          </BackLink>

          <UserContainer>
            <AvatarContainer>
              <UserAvatar url={avatar_url} name={name} />
            </AvatarContainer>
            <PersonalInfo data={userData} favoritesOptions={favoritesOptions} />
            <UserRepos reposQuantity={public_repos} repos={repos} />
          </UserContainer>
        </>
      )}
    </Container>
  );
};

export default UserPage;
