import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({
  title,
  ariaLabel,
  type = "submit",
  onClick = () => {},
  Icon,
}) => {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {Icon}
      <span>{title}</span>
    </button>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  Icon: PropTypes.node,
};
