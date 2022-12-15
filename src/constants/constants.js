const INITIAL_STATE = {
  list: [],
  user: null,
};

const HEADER_TITLES = {
  SEARCH_TITLE: "Search GitHub Users",
  SHIRT_SEARCH_TITLE: "Search Users",
  FAVORITES_TITLE: "Favorite Users",
  USER_TITLE: "User Profile",
};
const USERS_PER_PAGE = 15;
const PAGE_STEP = 1;
const BACK_BUTTON_TITLE = "Back";

const FAVORITES_DATA = JSON.parse(window.localStorage.getItem("favorites"));

const ERROR_TEXT = {
  ERR_NETWORK: "You are offline. Try later!",
  NO_AUTH: "Authenticate, pleace!",
  NO_USER: "No users with username",
};

export {
  INITIAL_STATE,
  HEADER_TITLES,
  USERS_PER_PAGE,
  FAVORITES_DATA,
  BACK_BUTTON_TITLE,
  PAGE_STEP,
  ERROR_TEXT,
};
