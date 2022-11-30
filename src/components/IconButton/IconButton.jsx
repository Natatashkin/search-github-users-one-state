import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./IconButton.module.scss";

// variant = 'default';
// variant = 'sticky';

const IconButton = ({
  type = "submit",
  variant = "default",
  onClick = () => {},
  children,
  ariaLabel,
}) => {
  return (
    <button
      className={classNames([
        styles.button,
        { [styles.sticky]: variant === "sticky" },
      ])}
      variant={variant}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;

IconButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
