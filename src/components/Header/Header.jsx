import React, { useState, useMemo, useRef } from "react";
import { useMatch } from "react-router-dom";
import { useTheme } from "styled-components";
import { Logo } from "./Logo";
import { useTitle } from "../../hooks";
import { TextField } from "../TextField";
import { PageTitle } from "../PageTitle";
import {
  HeaderContainer,
  InputWrapper,
  TitleContainer,
  IconWrapper,
} from "./Header.styled";
import { IoSearchOutline } from "react-icons/io5";

const Header = ({ onGetQuery }) => {
  const theme = useTheme();
  const { hideTitle, showSearch, pageTitle } = useTitle();
  const [query, setQuery] = useState("");
  const isSearchPage = Boolean(useMatch("/search"));

  const titleVisibility = useMemo(
    () => (isSearchPage ? hideTitle : null),
    [isSearchPage, hideTitle]
  );

  const handleOnChange = ({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  };
  return (
    <HeaderContainer titleVisibility={titleVisibility}>
      <Logo />
      <TitleContainer>
        <PageTitle title={pageTitle} />
      </TitleContainer>

      {showSearch && (
        <TextField
          titleVisibility={titleVisibility}
          name="search"
          value={query}
          onChange={handleOnChange}
        >
          <IoSearchOutline size={20} color={theme.colors.lightgrey} />
        </TextField>
      )}
    </HeaderContainer>
  );
};

export default Header;
