import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "styled-components";
import { checkFavorites } from "../helpers";

const useFavorites = (user) => {
  const { favorites, setFavorites } = useOutletContext();
  const theme = useTheme();
  const [favClick, setFavClick] = useState(() =>
    checkFavorites(favorites, user)
  );
  const toggleFavoriteClick = () => setFavClick(!favClick);

  const isFavButtonActive = useMemo(
    () => (favClick ? theme.colors.yellow : theme.colors.lightgrey),
    [favClick, theme]
  );

  useEffect(() => {
    if (favClick) {
      setFavorites((prevItems) => [...prevItems, user]);
      return;
    }

    setFavorites((prevItems) => {
      return prevItems.filter(({ login }) => login !== user.login);
    });
  }, [favClick]);

  return { isFavButtonActive, toggleFavoriteClick };
};

export default useFavorites;
