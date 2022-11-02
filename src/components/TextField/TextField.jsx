import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from './TexyField.styled';

const TextField = ({
  onChange,
  value = '',
  label = '',
  type = 'text',
  name,
}) => {
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input type={type} name={name} onChange={onChange} value={value} />
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
};
