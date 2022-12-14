import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TextField.module.scss";

const TextField = ({
  onChange,
  query,
  label = "",
  type = "text",
  name,
  Icon,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.adornment}>{Icon}</div>
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
  adornment: PropTypes.node,
};
