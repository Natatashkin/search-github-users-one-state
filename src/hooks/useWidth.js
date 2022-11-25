import { useState, useEffect, useCallback } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(0);

  const handleResize = useCallback(({ target }) => {
    setWidth(target.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window]);

  return { width };
};

export default useWidth;
