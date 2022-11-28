import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TextField.module.scss";

const TextField = ({
  onChange,
  value = "",
  label = "",
  type = "text",
  name,
  children,
}) => {
  const isSearch = name === "search";
  return (
    <div className={styles.container}>
      <div className={styles.adornment}>{children}</div>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={classNames([
          styles.input,
          { [styles["input--isSearch"]]: isSearch },
        ])}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};
