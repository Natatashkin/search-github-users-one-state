import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./BackLink.module.scss";

const CONSTANT_BACK_TITLE = "Back";

const BackLink = ({ location, alternativePath }) => {
  console.log(location);
  return (
    <Link
      to={location?.state?.from || alternativePath}
      className={styles.link}
      title="Back"
    >
      <IoArrowBack />
      <span>{CONSTANT_BACK_TITLE}</span>
    </Link>
  );
};

export default BackLink;
