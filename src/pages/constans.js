const PAGES_TITLES = {
  homePage: "Find Github Users",
  searchPage: "Search Page",
  dashboardPage: "You Dashboard",
  userPage: "User credentials",
  favoritePage: "Favorites Users",
};

const PAGES_DATA = [
  {
    pathname: "/",
    title: PAGES_TITLES.homePage,
  },
  {
    pathname: "/search",
    title: PAGES_TITLES.searchPage,
  },
  {
    pathname: "/dashboard",
    title: PAGES_TITLES.dashboardPage,
  },
  {
    pathname: `/user/*`,
    title: PAGES_TITLES.userPage,
  },
  {
    pathname: `/favorites`,
    title: PAGES_TITLES.favoritePage,
  },
];

export { PAGES_DATA };
