import React from "react";
import { useFavorites } from "../../../hooks";
import { FaStar } from "react-icons/fa";
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
  const { name, login, avatar_url, bio, followers, following, public_repos } =
    item;
  const { isFavorite, favButtonColor, toggleFavoriteClick } =
    useFavorites(item);
  console.log(isFavorite);
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
            <IconButton onClick={toggleFavoriteClick}>
              <FaStar color={favButtonColor} size={24} />
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
