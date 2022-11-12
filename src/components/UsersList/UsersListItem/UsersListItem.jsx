import React, { useState, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useTheme } from "styled-components";
import { useLocalStorage } from "../../../hooks";
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
  const { setFavorites } = useOutletContext();
  const { name, login, avatar_url, bio, followers, following, public_repos } =
    item;
  const [favClick, setFavClick] = useState(false);
  const toggleFavoriteClick = () => setFavClick(!favClick);

  const isFavButtonActive = useMemo(
    () => (favClick ? theme.colors.yellow : theme.colors.lightgrey),
    [favClick, theme]
  );

  const username = name ? name : login;

  useEffect(() => {
    if (favClick) {
      setFavorites((prevItems) => [...prevItems, item]);
      return;
    }

    setFavorites((prevItems) => {
      return prevItems.filter(({ login }) => login !== item.login);
      // const itemIdx = prevItems.findIndex(({ login }) => login === item.login);
      // prevItems.splice(itemIdx, 1);
      // return prevItems;
    });
  }, [favClick]);

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
