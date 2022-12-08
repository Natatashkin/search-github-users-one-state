import React from "react";
import LogoIcon from "../../icons/LogoIcon/LogoIcon";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <LogoIcon size={28} />
    </div>
  );
};

export default Logo;
