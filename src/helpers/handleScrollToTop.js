const handleScrollToTop = (ref, value) => {
  ref.current.scrollTo({
    top: value,
    behavior: "smooth",
  });
};

export default handleScrollToTop;
