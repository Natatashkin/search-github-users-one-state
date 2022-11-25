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

const SEARCH_PAGE_SHORT_TITLE = "Search Users";

export { PAGES_DATA, SEARCH_PAGE_SHORT_TITLE };
