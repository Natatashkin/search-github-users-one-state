import axios from "axios";

axios.defaults.baseURL = "https://api.github.com";
axios.defaults.headers.common["Authorization"] = "token ";
axios.defaults.headers.accept = "application/vnd.github+json";

const getUser = async (username) => {
  try {
    const { data } = await axios.get(`/users/${username}`);
    return data;
  } catch (error) {
    return error;
  }
};

const getUserRepos = async (username) => {
  try {
    const response = await axios.get(`/users/${username}/repos?type=owner`);
    return response;
  } catch (error) {
    return error;
  }
};

const searchUsers = async (name, page, per_page) => {
  try {
    const response = await axios.get(
      `/search/users?q=${name}&type=user&in=name&per_page=${per_page}&page=${page}`
    );
    const { data } = response;
    const findUsers = data.items.map(({ login }) => {
      const response = getUser(login);
      return response;
    });
    const usersData = await Promise.all(findUsers);
    return { usersData, totalUsers: data.total_count };
  } catch (error) {
    return error;
  }
};

export { searchUsers, getUser, getUserRepos };
