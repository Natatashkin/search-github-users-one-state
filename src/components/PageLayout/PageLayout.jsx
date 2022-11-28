import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const PageLayout = ({
  onGetQuery,
  location,
  searchParams,
  isUserPage,
  isSearchPage,
}) => {
  return (
    <>
      <Header
        onGetQuery={onGetQuery}
        searchParams={searchParams}
        location={location}
        isUserPage={isUserPage}
        isSearchPage={isSearchPage}
      />

      <Outlet />
    </>
  );
};

export default PageLayout;
