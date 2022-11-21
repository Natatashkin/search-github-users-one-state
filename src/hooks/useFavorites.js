import { useState, useEffect } from "react";
import { checkFavorites } from "../helpers";
import variables from "../styles/variables.scss";

const useFavorites = (user, favoritesOptions) => {
  const { favorites, setFavorites } = favoritesOptions;
  const isInFavorite = checkFavorites(favorites, user);
  const [isFavorite, setIsFavorite] = useState(isInFavorite);

  const toggleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  const favButtonColor = isFavorite ? variables.yellow : variables.lightgrey;

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
