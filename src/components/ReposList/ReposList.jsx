import React from "react";
import styles from "./ReposList.module.scss";

const ReposList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default ReposList;
