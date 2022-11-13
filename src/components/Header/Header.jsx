import React, { useState, useMemo, useCallback } from "react";
import { useMatch, useSearchParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Logo } from "./Logo";
import { useTitle } from "../../hooks";
import { TextField } from "../TextField";
import { PageTitle } from "../PageTitle";

import {
  HeaderContainer,
  TitleContainer,
  FavLink,
  TextFieldContainer,
  LogoContainer,
} from "./Header.styled";

const Header = ({ onGetQuery }) => {
  const theme = useTheme();
  const [searchParams] = useSearchParams("");
  const { hideTitle, showSearch, pageTitle } = useTitle();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const isSearchPage = Boolean(useMatch("/search"));

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  }, []);

  const titleVisibility = useMemo(
    () => (isSearchPage ? hideTitle : null),
    [isSearchPage, hideTitle]
  );

  return (
    <HeaderContainer titleVisibility={titleVisibility}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <TitleContainer>
        <PageTitle title={pageTitle} />
      </TitleContainer>

      {showSearch && (
        <TextFieldContainer>
          <TextField name="search" value={query} onChange={handleOnChange}>
            <IoSearchOutline size={20} color={theme.colors.lightgrey} />
          </TextField>
          <FavLink to="/favorites">
            <FaStar size={24} />
          </FavLink>
        </TextFieldContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
