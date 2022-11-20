import React from "react";
import styles from "./UserList.module.scss";

const UsersList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default UsersList;
