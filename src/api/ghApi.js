import axios from "axios";
import { toast } from "react-hot-toast";
import { USERS_PER_PAGE } from "../constants/constants";

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

const searchUsers = async (name, page) => {
  try {
    const { data } = await axios.get(
      `/search/users?q=${name}&type=user&in=name&per_page=${USERS_PER_PAGE}&page=${page}`
    );
    if (!data.total_count) {
      throw new Error(`No users with username "${name}"`);
    }
    const findUsers = data.items.map(({ login }) => {
      const response = getUser(login);
      return response;
    });
    const usersData = await Promise.all(findUsers);
    return { usersData, totalUsers: data.total_count };
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      error.message = "You are offline. Try later!";
    }

    if (error?.response?.status === 401) {
      error.message = "Authenticate, pleace!";
    }

    toast.error(error.message, { duration: 2000 });
    return;
  }
};

export { searchUsers, getUser, getUserRepos };
