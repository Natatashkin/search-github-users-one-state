import axios from 'axios';
// import { Octokit } from 'octokit';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common['Authorization'] =
  // 'token ';
  axios.defaults.headers.accept = 'application/vnd.github+json';

const controller = new AbortController();

const getUser = async username => {
  const { data } = await axios.get(`/users/${username}`);
  return data;
};

const getRateLimit = async () => {
  const response = await axios.get('/rate_limit');
  return response;
};

const searchUsers = async (name, page) => {
  try {
    const { data } = await axios.get(
      `/search/users?q=${name}&type=user&in=name&per_page=15&page=${page}`,
      { signal: controller.signal }
    );
    const findUsers = data.items.map(({ login }) => {
      const response = getUser(login);
      return response;
    });
    const usersData = await Promise.all(findUsers);
    return usersData;
  } catch (error) {
    console.log(error);
  }
};

export { getRateLimit, searchUsers, getUser, controller };
