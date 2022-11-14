import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) || defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites, key]);

  return { favorites, setFavorites };
};

export default useLocalStorage;
