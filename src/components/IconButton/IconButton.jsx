import React from "react";
import { Button } from "./IconButton.styled";

const IconButton = ({
  type = "submit",
  onClick = () => {},
  children,
  click = false,
}) => {
  return (
    <Button type={type} onClick={onClick} click={click}>
      {children}
    </Button>
  );
};

export default IconButton;
