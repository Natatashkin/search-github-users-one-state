const PAGES_TITLES = {
  homePage: 'Find Github Users',
  searchPage: 'Search Page',
  dashboardPage: 'You Dashboard',
  userPage: 'User credentials',
};

const PAGES_DATA = [
  {
    pathname: '/',
    title: PAGES_TITLES.homePage,
  },
  {
    pathname: '/search',
    title: PAGES_TITLES.searchPage,
  },
  {
    pathname: '/dashboard',
    title: PAGES_TITLES.dashboardPage,
  },
  {
    pathname: `/user/*`,
    title: PAGES_TITLES.userPage,
  },
];

export { PAGES_DATA };
