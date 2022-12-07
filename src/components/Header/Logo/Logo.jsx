import React from "react";
import LogoIcon from "../../icons/LogoIcon/LogoIcon";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <a href="/" aria-label="Link to main page">
        <LogoIcon size={28} />
      </a>
    </div>
  );
};

export default Logo;
