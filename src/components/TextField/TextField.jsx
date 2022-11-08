import React from "react";
import PropTypes from "prop-types";
import { Label, Input, InputWrapper, Adornment } from "./TextField.styled";

const TextField = ({
  onChange,
  value = "",
  label = "",
  type = "text",
  name,
  children,
  titleVisibility = false,
}) => {
  return (
    <InputWrapper name={name}>
      <Adornment>{children}</Adornment>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input type={type} name={name} onChange={onChange} value={value} />
    </InputWrapper>
  );
};

export default TextField;

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
