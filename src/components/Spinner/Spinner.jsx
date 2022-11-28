import React from "react";
import PropTypes from "prop-types";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./Spinner.module.scss";

const Spinner = ({ size = 10 }) => {
  return (
    <div className={styles.container}>
      <SyncLoader size={size} aria-label="Loading Spinner" />
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.number,
};
