import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UserCard = styled.div`
  width: 400px;
  border-radius: 4px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const UserLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000000;
`;
const Block = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: ${props => (props.noPadding ? '0' : '10px 10px 0')};
`;

const UserInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;
`;
const AvatarContainer = styled.div`
  display: flex;
  height: 100%;
`;
const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const User = styled.div`
  display: flex;
  flex-grow: 1;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  flex-grow: 1;
  padding-left: 10px;
`;

const Name = styled.h4`
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 12px;
  color: grey;
`;

const Favorite = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% / 3);
  padding: 10px;
`;

const StatsTitle = styled.h5`
  color: #585858;
  margin-bottom: 10px;
`;
const StatsData = styled.p`
  font-size: 12px;
  color: grey;
`;

export {
  UserCard,
  Avatar,
  UserLink,
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
};
