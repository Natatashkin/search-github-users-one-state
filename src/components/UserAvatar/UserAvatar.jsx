import classNames from "classnames";
import React from "react";
import styles from "./UserAvatar.module.scss";

// variant = "small"
// variant= "large"

const UserAvatar = ({ url, name, variant = "small" }) => {
  const isLarge = variant === "large";
  return (
    <div
      className={classNames([styles.avatarThumb, { [styles.large]: isLarge }])}
    >
      <img src={url} alt={`User's avatar ${name}`} />
    </div>
  );
};

export default UserAvatar;
