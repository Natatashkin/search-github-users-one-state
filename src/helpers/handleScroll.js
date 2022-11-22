const handleScroll = (
  { target: { scrollHeight, scrollTop, clientHeight } },
  setPageHandler,
  loading
) => {
  console.log(loading);
  const shouldUpdate = scrollHeight - Math.ceil(scrollTop) <= clientHeight;
  if (!shouldUpdate || loading) {
    return;
  }
  setPageHandler((prevPage) => {
    return prevPage + 1;
  });
};

export default handleScroll;
