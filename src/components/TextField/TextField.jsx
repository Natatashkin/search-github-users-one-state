import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TextField.module.scss";
import { useState } from "react";

const TextField = ({
  onChange,
  query,
  label = "",
  type = "text",
  name,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.adornment}>{children}</div>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={classNames([styles.input, styles["input--isSearch"]])}
        type={type}
        name={name}
        onChange={onChange}
        value={query}
        aria-label="Search"
      />
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};
