const toggleFavoriteClick = (user, favHandler, stateHandler) => {
  const isFavorite = Boolean(user.isFavorite);

  favHandler((prevFavorites) => {
    const newUser = { ...user, isFavorite: !isFavorite };
    if (!isFavorite) {
      const newFavorites = [...prevFavorites, newUser];
      window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    } else {
      const newFavorites = prevFavorites.filter(({ id }) => id !== user.id);
      window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    }
  });

  stateHandler((prevState) => {
    return {
      ...prevState,
      list: prevState.list.map((item) => {
        if (item.id === user.id) {
          item.isFavorite = !isFavorite;
        }
        return item;
      }),
    };
  });
};

export default toggleFavoriteClick;
