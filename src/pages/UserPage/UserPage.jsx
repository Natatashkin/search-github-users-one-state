import React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
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
// https://api.github.com/users/CatanaRaulAndrei/repos

const PER_PAGE_REPOS = 10;

const UserPage = () => {
  const location = useLocation();
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPAges] = useState(0);
  const [loading, setIsLoading] = useState(false);
  // public_repos;

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

// avatar_url: "https://avatars.githubusercontent.com/u/5754073?v=4";
// bio: "Developer Advocate and Augmented Reality-er.\r\n\r\nDeveloper experience is :key:";
// blog: "https://medium.com/@maxxfrazer";
// company: "@AgoraIO ";
// created_at: "2013-10-23T07:43:20Z";
// email: null;
// events_url: "https://api.github.com/users/maxxfrazer/events{/privacy}";
// followers: 306;
// followers_url: "https://api.github.com/users/maxxfrazer/followers";
// following: 24;
// following_url: "https://api.github.com/users/maxxfrazer/following{/other_user}";
// gists_url: "https://api.github.com/users/maxxfrazer/gists{/gist_id}";
// gravatar_id: "";
// hireable: true;
// html_url: "https://github.com/maxxfrazer";
// id: 5754073;
// location: "London, UK";
// login: "maxxfrazer";
// name: "Max Cobb";
// node_id: "MDQ6VXNlcjU3NTQwNzM=";
// organizations_url: "https://api.github.com/users/maxxfrazer/orgs";
// public_gists: 5;
// public_repos: 60;
// received_events_url: "https://api.github.com/users/maxxfrazer/received_events";
// repos_url: "https://api.github.com/users/maxxfrazer/repos";
// site_admin: false;
// starred_url: "https://api.github.com/users/maxxfrazer/starred{/owner}{/repo}";
// subscriptions_url: "https://api.github.com/users/maxxfrazer/subscriptions";
// twitter_username: "maxxfrazer";
// type: "User";
// updated_at: "2022-11-11T07:34:37Z";
// url: "https://api.github.com/users/maxxfrazer";
