import React from 'react';
import { List } from './UsersList.styled';

const UsersList = ({ children }) => {
  return <List>{children}</List>;
};

export default UsersList;
