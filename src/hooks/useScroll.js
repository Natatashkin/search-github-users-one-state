import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { handleScroll } from "../helpers";

const useScroll = (pageHandler = () => {}, loading = false) => {
  const pageSetter = pageHandler;
  const [showTopBtn, setShowButton] = useState(false);

  const debouncedScroll = useDebouncedCallback((event) => {
    handleScroll(event, pageSetter, loading);
  }, 150);

  const handleScrollTop = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 150) {
      setShowButton(true);
      return;
    }
    setShowButton(false);
  };

  const onScroll = (e) => {
    handleScrollTop(e);
    debouncedScroll(e);
  };

  return { showTopBtn, onScroll, handleScrollTop };
};

export default useScroll;
