import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { useTheme } from "styled-components";
import { PAGES_DATA } from "../pages/constans";

const useTitle = () => {
  const location = useLocation();
  const isUserPage = useMatch("/user/*");
  const isSearchPage = Boolean(useMatch("/search"));
  const theme = useTheme();
  const [hideTitle, setHideTitle] = useState(false);

  const tabletBreakpoint = Number(theme.breakpoints.tablet);
  const [showSearch, setShowSearch] = useState(false);

  const checkTabletBreakpoint = useCallback(
    (elem) => {
      const screenWidth = elem.innerWidth;
      const shouldHideTitle = screenWidth < tabletBreakpoint;

      if (shouldHideTitle) {
        setHideTitle(true);
        return;
      }

      setHideTitle(false);
    },
    [tabletBreakpoint]
  );

  const handleHideTitle = useCallback(
    (e) => {
      checkTabletBreakpoint(e.target);
    },
    [checkTabletBreakpoint]
  );

  useEffect(() => {
    if (isSearchPage) {
      checkTabletBreakpoint(window);
    }
  }, [isSearchPage, checkTabletBreakpoint]);

  useEffect(() => {
    if (isSearchPage) {
      window.addEventListener("resize", handleHideTitle);
      return () => window.removeEventListener("resize", handleHideTitle);
    }
  }, [isSearchPage, handleHideTitle]);

  const pageTitle = useMemo(() => {
    const { title } = PAGES_DATA.find(({ pathname }) => {
      return (
        pathname === location.pathname || pathname === isUserPage?.pattern?.path
      );
    });
    console.log(title);
    if (isSearchPage) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }

    return title;
  }, [location, isUserPage, isSearchPage]);

  return { hideTitle, showSearch, pageTitle };
};

export default useTitle;
