import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useTheme } from "styled-components";

const useFavoriteClick = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [favClick, setFavClick] = useState(false);

  const toggleFavoriteClick = () => setFavClick(!favClick);
  const handleFavoriteClick = (e, user) => {
    console.log(user);
    // toggleFavoriteClick();
  };

  const isFavButtonActive = useMemo(
    () => (favClick ? theme.colors.yellow : theme.colors.lightgrey),
    [favClick, theme]
  );

  return {
    favClick,
    isFavButtonActive,
    setFavClick,
    toggleFavoriteClick,
    handleFavoriteClick,
  };
};

export default useFavoriteClick;
