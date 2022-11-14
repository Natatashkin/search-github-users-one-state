import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "styled-components";
import { checkFavorites } from "../helpers";

const useFavorites = (user) => {
  const { favorites, setFavorites } = useOutletContext();
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(() =>
    checkFavorites(favorites, user)
  );
  const [favClick, setFavClick] = useState(false);

  const toggleFavoriteClick = () => {
    setFavClick(!favClick);
    setIsFavorite(!isFavorite);
  };

  const favButtonColor = useMemo(
    () => (isFavorite ? theme.colors.yellow : theme.colors.lightgrey),
    [isFavorite, theme]
  );

  useEffect(() => {
    if (favClick) {
      setFavorites((prevItems) => [...prevItems, user]);
      return;
    }

    if (!favClick && !isFavorite) {
      setFavorites((prevItems) => {
        return prevItems.filter(({ login }) => login !== user.login);
      });
    }
  }, [favClick, isFavorite]);

  return { isFavorite, favButtonColor, toggleFavoriteClick };
};

export default useFavorites;
