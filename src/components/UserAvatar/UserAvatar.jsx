import React from "react";
import { AvatarContainer } from "./UserAvatar.styled";

const UserAvatar = ({ url, name }) => {
  return (
    <AvatarContainer>
      <img src={url} alt={`User's avatar ${name}`} />
    </AvatarContainer>
  );
};

export default UserAvatar;
