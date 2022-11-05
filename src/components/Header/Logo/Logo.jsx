import React from "react";
import { Link } from "react-router-dom";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { useTheme } from "styled-components";
import { StyledLink } from "./Logo.styled";

const Logo = () => {
  const theme = useTheme();

  return (
    <StyledLink to="/">
      <IoPeopleCircleSharp size={28} color={theme.colors.black} />
    </StyledLink>
  );
};

export default Logo;
