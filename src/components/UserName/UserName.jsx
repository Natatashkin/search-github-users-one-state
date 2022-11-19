import React from "react";
import styles from "./UserName.module.scss";

const UserName = ({ name, login, url }) => {
  const hasUsername = name ? name : "No username";
  return (
    <div className={styles.name}>
      {<h3>{hasUsername}</h3>}
      <h4>
        <a href={url} target="_blank" rel="noreferrer">{`@${login}`}</a>
      </h4>
    </div>
  );
};

export default UserName;
