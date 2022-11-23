import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

const useScroll = ({ pageHandler, totalPages, loading }) => {
  const [showTopBtn, setShowButton] = useState(false);

  const handleScroll = ({
    target: { scrollHeight, scrollTop, clientHeight },
  }) => {
    const shouldUpdate = scrollHeight - Math.ceil(scrollTop) <= clientHeight;

    if (!shouldUpdate || loading) {
      return;
    }
    pageHandler((prevPage) => {
      if (totalPages === prevPage) return prevPage;
      return prevPage + 1;
    });
  };

  const debouncedScroll = useDebouncedCallback(handleScroll, 150);

  const handleShowButtonTop = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 150) {
      setShowButton(true);
      return;
    }
    setShowButton(false);
  };

  const onScroll = useCallback(
    (e) => {
      handleShowButtonTop(e);
      if (pageHandler) {
        debouncedScroll(e);
      }
    },
    [debouncedScroll, pageHandler]
  );

  const handleScrollTopClick = (ref, value) => {
    ref.current.scrollTo({
      top: value,
      behavior: "smooth",
    });
  };

  return { showTopBtn, onScroll, handleScrollTopClick };
};

export default useScroll;
