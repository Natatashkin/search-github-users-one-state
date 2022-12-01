import React from "react";
import PropTypes from "prop-types";
import DotIcon from "../icons/DotIcon/DotIcon";
import FollowersIcon from "../icons/FollowersIcon/FollowersIcon";
import styles from "./UserSubscriptions.module.scss";

const UserSubscriptions = ({ followers, following }) => {
  return (
    <div className={styles.subscriptions}>
      <FollowersIcon />

      <div>
        <span className="quantity">{followers}</span>
        <span>followers</span>
      </div>
      <DotIcon size={10} />
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
