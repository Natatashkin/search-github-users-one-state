import React from "react";
import { Link } from "react-router-dom";
import styles from "./IconRouteLink.module.scss";

const IconRouteLink = ({ path, state = null, children }) => {
  return (
    <Link to={path} state={state} className={styles.link}>
      {children}
    </Link>
  );
};

export default IconRouteLink;
