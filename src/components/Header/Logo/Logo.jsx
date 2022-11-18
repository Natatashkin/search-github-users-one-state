import React from "react";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IconRouteLink } from "../../../components";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <IconRouteLink path="/">
        <IoPeopleCircleSharp size={28} />
      </IconRouteLink>
    </div>
  );
};

export default Logo;
