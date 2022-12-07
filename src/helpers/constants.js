const INITIAL_STATE = {
  list: [],
  user: null,
  page: 1,
  totalUsers: 0,
  error: "",
};

const USERS_PER_PAGE = 15;

const FAVORITES_DATA = JSON.parse(window.localStorage.getItem("favorites"));

export { INITIAL_STATE, USERS_PER_PAGE, FAVORITES_DATA };
