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
  TitleContainer,
  FavLink,
  TextFieldContainer,
  LogoContainer,
} from "./Header.styled";

const Header = ({
  onGetQuery,
  location,
  searchParams,
  isSearchPage,
  isUserPage,
}) => {
  const theme = useTheme();
  const title = pageTitle(location, isUserPage);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  }, []);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <TitleContainer>
        <PageTitle title={title} />
      </TitleContainer>

      {isSearchPage && (
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
