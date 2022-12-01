import React from "react";
import IconRouteLink from "../../IconRouteLink/IconRouteLink";
import LogoIcon from "../../icons/LogoIcon/LogoIcon";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <IconRouteLink path="/" ariaLabel="Link to main page">
        <LogoIcon size={28} />
      </IconRouteLink>
    </div>
  );
};

export default Logo;
