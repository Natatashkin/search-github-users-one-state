import React from "react";
import PropTypes from "prop-types";
import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ message }) => {
  return <h3 className={styles.errorTitle}>{message}</h3>;
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
