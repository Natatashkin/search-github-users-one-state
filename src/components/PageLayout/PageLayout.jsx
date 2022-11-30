import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Spinner from "../Spinner/Spinner";

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
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default PageLayout;
