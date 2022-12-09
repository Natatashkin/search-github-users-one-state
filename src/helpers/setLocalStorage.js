const setLocalStorage = (items) =>
  window.localStorage.setItem("favorites", JSON.stringify(items));

export default setLocalStorage;
