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
  Icon,
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
      {Icon}
    </button>
  );
};

export default IconButton;

IconButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  Icon: PropTypes.node.isRequired,
};
