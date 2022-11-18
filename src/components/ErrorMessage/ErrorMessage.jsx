import React from "react";
import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ message }) => {
  return <h3 className={styles.errorTitle}>{message}</h3>;
};

export default ErrorMessage;
