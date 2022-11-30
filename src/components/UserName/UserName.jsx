import React from "react";
import PropTypes from "prop-types";
import styles from "./UserName.module.scss";

const UserName = ({ name, login, url }) => {
  const hasUsername = name || "No username";
  return (
    <div className={styles.name}>
      <h3>{hasUsername}</h3>
      <h4>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label="See user profile on GitHub"
        >{`@${login}`}</a>
      </h4>
    </div>
  );
};

export default UserName;

PropTypes.propTypes = {
  name: PropTypes.string,
  login: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
