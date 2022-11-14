import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import * as ghApi from "../../api/ghApi";
import {
  Container,
  UserAvatar,
  PersonalInfo,
  UserRepos,
} from "../../components";
import { BackLink, UserContainer, AvatarContainer } from "./UserPage.styled";

const PER_PAGE_REPOS = 10;

const UserPage = () => {
  const location = useLocation();
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPAges] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ghApi.getUser(username);
      const repos = await ghApi.getUserRepos(username, PER_PAGE_REPOS, page);
      setTotalPAges(response.public_repos);
      setUserData({ ...response, repos });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  console.log(userData);

  // Спросить Андрея как работает возврат запроса в инпут?????
  return (
    <Container>
      {loading && <h3>Loading...</h3>}
      {userData?.login && (
        <>
          <BackLink to={location?.state?.from || "/search"}>
            <IoArrowBack />
            <span>
              Back <span> to search</span>{" "}
            </span>
          </BackLink>

          <UserContainer>
            <AvatarContainer>
              <UserAvatar url={userData.avatar_url} name={userData.name} />
            </AvatarContainer>
            <PersonalInfo data={userData} />
            <UserRepos
              reposQuantity={userData.public_repos}
              repos={userData.repos}
            />
          </UserContainer>
        </>
      )}
    </Container>
  );
};

export default UserPage;
