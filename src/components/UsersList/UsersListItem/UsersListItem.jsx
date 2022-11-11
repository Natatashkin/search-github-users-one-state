import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTheme } from "styled-components";
import { useFavoriteClick } from "../../../hooks";
import { IconButton } from "../../IconButton";
import {
  UserCard,
  UserLink,
  Avatar,
  Image,
  Block,
  UserInfo,
  Name,
  Bio,
  AvatarContainer,
  Stats,
  StatsTitle,
  StatsData,
  UserInfoWrapper,
  Favorite,
  User,
} from "./UsersListItem.styled";

const UsersListItem = ({ item, location }) => {
  const theme = useTheme();
  const { name, login, avatar_url, bio, followers, following, public_repos } =
    item;

  const { favClick, isFavButtonActive, handleFavoriteClick } =
    useFavoriteClick();
  const username = name ? name : login;

  return (
    <UserCard>
      <Block>
        <UserInfoWrapper>
          <UserLink to={`/user/${login}`} state={{ from: location }}>
            <User>
              <AvatarContainer>
                <Avatar>
                  <Image src={avatar_url} alt={`Avatar ${username}`} />
                </Avatar>
              </AvatarContainer>

              <UserInfo>
                <Name>{username}</Name>
                <Bio>{bio}</Bio>
              </UserInfo>
            </User>
          </UserLink>
          <Favorite>
            <IconButton onClick={(e) => handleFavoriteClick(e, item)}>
              <FaStar color={isFavButtonActive} size={24} />
            </IconButton>
          </Favorite>
        </UserInfoWrapper>
      </Block>
      <Block noPadding>
        <Stats>
          <StatsTitle>followers</StatsTitle>
          <StatsData>{followers}</StatsData>
        </Stats>
        <Stats>
          <StatsTitle>following</StatsTitle>
          <StatsData>{following}</StatsData>
        </Stats>
        <Stats>
          <StatsTitle>repos</StatsTitle>
          <StatsData>{public_repos}</StatsData>
        </Stats>
      </Block>
    </UserCard>
  );
};

export default UsersListItem;
