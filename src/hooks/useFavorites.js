import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "styled-components";
import { checkFavorites } from "../helpers";

const useFavorites = (user) => {
  const { favorites, setFavorites } = useOutletContext();
  const theme = useTheme();
  const isInFavorite = checkFavorites(favorites, user);
  const [isFavorite, setIsFavorite] = useState(isInFavorite);

  const toggleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  const favButtonColor = isFavorite
    ? theme.colors.yellow
    : theme.colors.lightgrey;

  useEffect(() => {
    if (isInFavorite && isFavorite) return;
    if (isFavorite) {
      setFavorites((prevItems) => [...prevItems, user]);
      return;
    }
    setFavorites((prevItems) =>
      prevItems.filter(({ login }) => login !== user.login)
    );
  }, [isFavorite]);

  return { isFavorite, favButtonColor, toggleFavoriteClick };
};

export default useFavorites;
