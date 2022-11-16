import React from "react";
import { Title } from "./PageTitle.styled";

const PageTitle = ({ title }) => {
  console.log(title);
  return <Title>{title}</Title>;
};

export default PageTitle;
