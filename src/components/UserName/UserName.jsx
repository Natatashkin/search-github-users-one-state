import React from "react";
import PropTypes from "prop-types";
import styles from "./UserName.module.scss";

const UserName = ({ name, login, url }) => {
  const hasUsername = name || "No username";
  return (
    <div className={styles.name}>
      <h2>{hasUsername}</h2>
      <h3>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label="See user profile on GitHub"
        >{`@${login}`}</a>
      </h3>
    </div>
  );
};

export default UserName;

PropTypes.propTypes = {
  name: PropTypes.string,
  login: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
