import React from "react";
import styles from "./ReposList.module.scss";

const ReposList = ({ open, children }) => {
  return (
    <ul className={styles.list} openList={open}>
      {children}
    </ul>
  );
};

export default ReposList;
