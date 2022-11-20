const filterNewItems = (prevItems, newItems) => {
  const existedIds = [...prevItems.map(({ id }) => id)];
  return newItems.filter(({ id }) => !existedIds.includes(id));
};

export default filterNewItems;
