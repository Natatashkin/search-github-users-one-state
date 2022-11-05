import React, { useState, useMemo, useRef, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { Logo } from "./Logo";
import { useTitle } from "../../hooks";
import { TextField } from "../TextField";
import { PageTitle } from "../PageTitle";
import { HeaderContainer, InputWrapper, TitleContainer } from "./Header.styled";

const Header = ({ onGetQuery }) => {
  const { hideTitle, showSearch, pageTitle } = useTitle();
  const [query, setQuery] = useState("");
  const isSearchPage = Boolean(useMatch("/search"));
  const titleVisibility = isSearchPage ? hideTitle : null;

  const handleOnChange = ({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  };
  return (
    <HeaderContainer>
      <Logo />
      <TitleContainer titleVisibility={titleVisibility}>
        <PageTitle title={pageTitle} />
      </TitleContainer>

      {showSearch && (
        <InputWrapper>
          <TextField name="search" value={query} onChange={handleOnChange} />
        </InputWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
