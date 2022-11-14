const checkFavorites = (favItems, user) => {
  const isInFavorites = favItems.find(({ login }) => login === user.login);
  return isInFavorites;
};

export default checkFavorites;
