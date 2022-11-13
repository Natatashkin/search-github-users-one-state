const checkFavorites = (favItems, user) => {
  const isInFavorites = favItems.find(({ login }) => login === user.login);
  if (isInFavorites) return true;
  return false;
};

export default checkFavorites;
