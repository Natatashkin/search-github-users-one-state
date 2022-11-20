import React from "react";
import styles from "./UserBio.module.scss";

const UserBio = ({ text }) => {
  return (
    <div className={styles.container}>
      <p>{text}</p>
    </div>
  );
};

export default UserBio;
