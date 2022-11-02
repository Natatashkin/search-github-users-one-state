import React from 'react';
import { Button } from './IconButton.styled';

const IconButton = ({ type = 'submit', onClick = () => {}, children }) => {
  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default IconButton;
