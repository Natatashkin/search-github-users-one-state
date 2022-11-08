const filterNewUsers = (prevUsers, newUsers) => {
  const existedIds = [...prevUsers.map(({ id }) => id)];
  return newUsers.filter(({ id }) => !existedIds.includes(id));
};

export default filterNewUsers;
