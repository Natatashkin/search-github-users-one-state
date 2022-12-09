const INITIAL_STATE = {
  list: [],
  user: null,
  page: 1,
  totalUsers: 0,
  error: "",
};

const HEADER_TITLES = {
  search: "Search GitHub Users",
  favorites: "Favorite Users",
  user: "User Profile",
};
const USERS_PER_PAGE = 15;
const BACK_BUTTON_TITLE = "Back";

const FAVORITES_DATA = JSON.parse(window.localStorage.getItem("favorites"));

export {
  INITIAL_STATE,
  HEADER_TITLES,
  USERS_PER_PAGE,
  FAVORITES_DATA,
  BACK_BUTTON_TITLE,
};
