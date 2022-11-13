import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "styled-components";

const useFavorites = (user) => {
  const { setFavorites } = useOutletContext();
  const theme = useTheme();
  const [favClick, setFavClick] = useState(false);
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
      // const itemIdx = prevItems.findIndex(({ login }) => login === item.login);
      // prevItems.splice(itemIdx, 1);
      // return prevItems;
    });
  }, [favClick]);

  return { isFavButtonActive, toggleFavoriteClick };
};

export default useFavorites;
