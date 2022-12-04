import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import BackIcon from "../icons/BackIcon/BackIcon";
import styles from "./BackLink.module.scss";

const CONSTANT_BACK_TITLE = "Back";

const BackLink = () => {
  return (
    // <Link
    //   to={location?.state?.from || alternativePath}
    //   className={styles.link}
    //   title={CONSTANT_BACK_TITLE}
    // >
    <div>
      <BackIcon />
      <span>{CONSTANT_BACK_TITLE}</span>
    </div>
    // </Link>
  );
};

export default BackLink;

BackLink.propTypes = {};
