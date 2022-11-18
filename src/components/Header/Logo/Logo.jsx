import React from "react";
import { Link } from "react-router-dom";
import { IoPeopleCircleSharp } from "react-icons/io5";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <IoPeopleCircleSharp size={24} />
    </Link>
  );
};

export default Logo;
