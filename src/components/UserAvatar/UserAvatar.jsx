import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./UserAvatar.module.scss";

// variant = "small"
// variant = "middle"
// variant= "large"

const UserAvatar = ({ url, name, variant = "small" }) => {
  const isAvatarLarge = variant === "large";
  const isAvatarMiddle = variant === "middle";
  return (
    <div
      className={classNames([
        styles.avatarThumb,
        { [styles.large]: isAvatarLarge, [styles.middle]: isAvatarMiddle },
      ])}
    >
      <img src={url} alt={`User's avatar ${name}`} />
    </div>
  );
};

export default UserAvatar;

UserAvatar.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
