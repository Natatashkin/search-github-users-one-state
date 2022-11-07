import React from "react";
import { Error } from "./ErrorMessage.styled";

const ErrorMessage = ({ message }) => {
  return <Error>{message}</Error>;
};

export default ErrorMessage;
