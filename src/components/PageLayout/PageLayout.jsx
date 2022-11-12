import React, { useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks";
import { Header } from "../Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  position: relative;
`;

const PageLayout = () => {
  const [searchParams] = useSearchParams("");
  const { favorites, setFavorites } = useLocalStorage("favorites", []);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");

  const getQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <LayoutContainer>
      <Header onGetQuery={getQuery} />
      <Outlet context={{ searchQuery, favorites, setFavorites }} />
    </LayoutContainer>
  );
};

export default PageLayout;
