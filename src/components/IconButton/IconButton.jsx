import React from "react";
import styles from "./IconButton.module.scss";

const IconButton = ({ type = "submit", onClick = () => {}, children }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
