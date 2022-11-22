import React from "react";
import PropTypes from "prop-types";
import styles from "./UserList.module.scss";

const UsersList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default UsersList;

UsersList.propTypes = {
  children: PropTypes.node,
};
