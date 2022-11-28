import React from "react";
import PropTypes from "prop-types";
import { FaUsers } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "./UserSubscriptions.module.scss";

const UserSubscriptions = ({ followers, following }) => {
  return (
    <div className={styles.subscriptions}>
      <FaUsers />
      <div>
        <span className="quantity">{followers}</span>
        <span>followers</span>
      </div>
      <GoPrimitiveDot size={10} />
      <div>
        <span className="quantity">{following}</span>
        <span>following</span>
      </div>
    </div>
  );
};

export default UserSubscriptions;

UserSubscriptions.propTypes = {
  followers: PropTypes.number,
  following: PropTypes.number,
};
