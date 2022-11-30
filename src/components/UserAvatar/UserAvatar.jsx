import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./UserAvatar.module.scss";

// variant = "small"
// variant = "middle"
// variant= "large"

const UserAvatar = ({ url, name, size = "small" }) => {
  const isAvatarLarge = size === "large";
  const isAvatarMiddle = size === "middle";
  const isAvatarSmall = size === "small";
  return (
    <div
      className={classNames([
        styles.avatarThumb,
        {
          [styles.small]: isAvatarSmall,
          [styles.large]: isAvatarLarge,
          [styles.middle]: isAvatarMiddle,
        },
      ])}
    >
      <img src={url} alt={`User's avatar ${name}`} width="100%" height="100%" />
    </div>
  );
};

export default UserAvatar;

UserAvatar.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string,
  variant: PropTypes.string,
};
