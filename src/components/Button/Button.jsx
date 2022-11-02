import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, type = 'submit', onClick = () => {} }) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
