import React from 'react';
import { FaStar } from 'react-icons/fa';
import { IconButton } from '../../IconButton';
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
} from './UsersListItem.styled';

const UsersListItem = ({ item, location }) => {
  const { name, login, avatar_url, bio, followers, following, public_repos } =
    item;

  const username = name ? name : login;

  return (
    <UserCard>
      <UserLink to={`/user/${login}`} state={{ from: location }}>
        <Block>
          <UserInfoWrapper>
            <AvatarContainer>
              <Avatar>
                <Image src={avatar_url} alt={`Avatar ${username}`} />
              </Avatar>
            </AvatarContainer>
            <User>
              <UserInfo>
                <Name>{username}</Name>
                <Bio>{bio}</Bio>
              </UserInfo>
              <Favorite>
                <IconButton>
                  <FaStar color="#ece751" size={24} />
                </IconButton>
              </Favorite>
            </User>
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
      </UserLink>
    </UserCard>
  );
};

export default UsersListItem;
