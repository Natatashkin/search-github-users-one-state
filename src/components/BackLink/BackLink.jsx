import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./BackLink.module.scss";

const CONSTANT_BACK_TITLE = "Back";

const BackLink = ({ location, alternativePath }) => {
  return (
    <Link
      to={location?.state?.from || alternativePath}
      className={styles.link}
      title={CONSTANT_BACK_TITLE}
    >
      <IoArrowBack />
      <span>{CONSTANT_BACK_TITLE}</span>
    </Link>
  );
};

export default BackLink;

BackLink.propTypes = {
  location: PropTypes.object,
  alternativePath: PropTypes.string.isRequired,
};
