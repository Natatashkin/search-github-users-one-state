import React, { useState, useMemo, useRef } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { Logo } from "./Logo";
import { TextField } from "../TextField";
import { PageTitle } from "../PageTitle";
import { PAGES_DATA } from "../../pages/constans";
import { HeaderContainer, InputWrapper } from "./Header.styled";

// IoPeopleCircleSharp
const Header = ({ onGetQuery }) => {
  const location = useLocation();
  const matchUserPage = useMatch("/user/*");

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const pageTitle = useMemo(() => {
    const currentPageData = PAGES_DATA.find(({ pathname }) => {
      return pathname === location.pathname || matchUserPage?.pattern?.path;
    });

    if (currentPageData.pathname === "/search") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }

    return currentPageData.title;
  }, [location.pathname, matchUserPage]);

  const handleOnChange = ({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  };

  return (
    <HeaderContainer>
      <Logo />
      <PageTitle title={pageTitle} />
      {showSearch && (
        <InputWrapper>
          <TextField name="search" value={query} onChange={handleOnChange} />
        </InputWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
