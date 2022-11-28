import React from "react";
import PropTypes from "prop-types";
import styles from "./UserBio.module.scss";

const UserBio = ({ text }) => {
  return (
    <div className={styles.container}>
      <p>{text}</p>
    </div>
  );
};

export default UserBio;

UserBio.propTypes = {
  text: PropTypes.string,
};
