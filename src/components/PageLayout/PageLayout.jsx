import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  position: relative;
`;

const PageLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const getQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <LayoutContainer>
      <Header onGetQuery={getQuery} />

      <Outlet context={{ searchQuery }} />
    </LayoutContainer>
  );
};

export default PageLayout;
