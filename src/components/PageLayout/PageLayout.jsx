import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";

const PageLayout = ({ onGetQuery }) => {
  return (
    <>
      <Header onGetQuery={onGetQuery} />
      <Outlet />
    </>
  );
};

export default PageLayout;
