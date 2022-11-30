import React from "react";
import IconRouteLink from "../../IconRouteLink/IconRouteLink";
import { IoPeopleCircleSharp } from "react-icons/io5";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <IconRouteLink path="/" ariaLabel="Link to main page">
        <IoPeopleCircleSharp size={28} />
      </IconRouteLink>
    </div>
  );
};

export default Logo;
