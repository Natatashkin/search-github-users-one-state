import React, { useState, useCallback } from "react";
import { useTheme } from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Logo } from "./Logo";
import { pageTitle } from "../../helpers";
import { TextField } from "../TextField";
import { PageTitle } from "../PageTitle";

import {
  HeaderContainer,
  LogoAndTitleContainer,
  TitleContainer,
  FavLink,
  TextFieldContainer,
  LogoContainer,
} from "./Header.styled";

const Header = ({ onGetQuery, location, isSearchPage, isUserPage }) => {
  const theme = useTheme();
  const title = pageTitle(location, isUserPage);
  const [query, setQuery] = useState("");

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  }, []);

  return (
    <HeaderContainer isSearchPage={isSearchPage}>
      <LogoAndTitleContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <TitleContainer>
          <PageTitle title={title} />
        </TitleContainer>
      </LogoAndTitleContainer>
      {isSearchPage && (
        <TextFieldContainer>
          <TextField name="search" value={query} onChange={handleOnChange}>
            <IoSearchOutline size={20} color={theme.colors.lightgrey} />
          </TextField>
          <FavLink to="/favorites" state={{ from: location }}>
            <FaStar size={24} />
          </FavLink>
        </TextFieldContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
