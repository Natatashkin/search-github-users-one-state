import React, { forwardRef } from "react";
import { MainContainer } from "./Container.styled";

const Container = forwardRef(({ children }) => {
  return <MainContainer>{children}</MainContainer>;
});

export default Container;
