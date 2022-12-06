const addFavoriteStatus = (incomingArray, favArray) => {
  return incomingArray.map((user) => {
    const isInFavorites = favArray.find((item) => item.id === user.id);
    user.isFavorite = Boolean(isInFavorites);
    return user;
  });
};

export default addFavoriteStatus;
