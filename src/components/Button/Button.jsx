import React from "react";
import PropTypes from "prop-types";
import { TextButton } from "./Button.styled";

const Button = ({ title, type = "submit", onClick = () => {} }) => {
  return (
    <TextButton type={type} onClick={onClick}>
      {title}
    </TextButton>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
