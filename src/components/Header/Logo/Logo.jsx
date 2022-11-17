import React from "react";
import { Link } from "react-router-dom";
import { IoPeopleCircleSharp } from "react-icons/io5";
import "./Logo.scss";

const Logo = () => {
  return (
    <Link to="/" className="Logo-link">
      <IoPeopleCircleSharp size={28} />
    </Link>
  );
};

export default Logo;
