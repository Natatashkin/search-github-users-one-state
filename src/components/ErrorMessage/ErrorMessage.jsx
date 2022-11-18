import React from "react";
import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ message }) => {
  return <h2 className={styles.errorTitle}>{message}</h2>;
};

export default ErrorMessage;
