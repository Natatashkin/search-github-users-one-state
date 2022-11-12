import React from "react";
import { Bio, BioContainer } from "./UserBio.styled";

const UserBio = ({ text }) => {
  return (
    <BioContainer>
      <Bio>{text}</Bio>
    </BioContainer>
  );
};

export default UserBio;
