import React, { forwardRef } from "react";
import { List } from "./UsersList.styled";

const UsersList = forwardRef(({ children }, ref) => {
  return <List ref={ref}>{children}</List>;
});

export default UsersList;
