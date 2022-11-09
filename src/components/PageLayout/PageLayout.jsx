import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks";
import { Header } from "../Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  position: relative;
`;

const PageLayout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites] = useLocalStorage("favorites", []);
  const [favClick, setClick] = useState(false);

  const toggleFavoriteClick = () => setClick(!favClick);
  const handleFavoriteClick = () => {
    toggleFavoriteClick();
  };

  const getQuery = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setTimeout(() => {
      if (favClick) {
        navigate("/favorites");
      }
    }, 350);
  }, [favClick, navigate]);

  return (
    <LayoutContainer>
      <Header
        onGetQuery={getQuery}
        isFavoritesActive={favClick}
        onClick={handleFavoriteClick}
      />

      <Outlet context={{ searchQuery, favorites }} />
    </LayoutContainer>
  );
};

export default PageLayout;
