import React from "react";
import PropTypes from "prop-types";
import styles from "./ReposList.module.scss";

const ReposList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default ReposList;

ReposList.propTypes = {
  children: PropTypes.node,
};
