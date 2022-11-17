import React from "react";
import { Link } from "react-router-dom";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { useTheme } from "styled-components";
import "./Logo.scss";
// import { StyledLink } from "./Logo.styled";

const Logo = () => {
  const theme = useTheme();

  return (
    <Link to="/" className="Logo-link">
      <IoPeopleCircleSharp size={28} />
    </Link>
  );
};

export default Logo;
