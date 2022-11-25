const PAGES_TITLES = {
  searchPage: "Search Github Users",
  userPage: "User credentials",
  favoritePage: "Favorites Users",
};

const PAGES_DATA = [
  {
    pathname: "/",
    title: PAGES_TITLES.searchPage,
  },

  {
    pathname: "/user/*",
    title: PAGES_TITLES.userPage,
  },
  {
    pathname: "/favorites",
    title: PAGES_TITLES.favoritePage,
  },
];

export { PAGES_DATA };
