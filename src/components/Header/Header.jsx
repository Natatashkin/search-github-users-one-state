import React, { useState, useMemo, useRef } from "react";
import { useMatch } from "react-router-dom";
import { useTheme } from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { Logo } from "./Logo";
import { useTitle } from "../../hooks";
import { TextField } from "../TextField";
import { PageTitle } from "../PageTitle";
import {
  HeaderContainer,
  TitleContainer,
  FavButtonContainer,
  TextFieldContainer,
} from "./Header.styled";
import { IconButton } from "../IconButton";

const Header = ({ onGetQuery }) => {
  const theme = useTheme();
  const { hideTitle, showSearch, pageTitle } = useTitle();
  const [query, setQuery] = useState("");
  const isSearchPage = Boolean(useMatch("/search"));

  const [click, setClick] = useState(false);
  const toggleFavoriteClick = () => setClick(!click);

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
        <TextFieldContainer titleVisibility={titleVisibility}>
          <TextField
            titleVisibility={titleVisibility}
            name="search"
            value={query}
            onChange={handleOnChange}
          >
            <IoSearchOutline size={20} color={theme.colors.lightgrey} />
          </TextField>
          <FavButtonContainer>
            <IconButton
              click={click}
              type="button"
              onClick={toggleFavoriteClick}
            >
              <IoStar size={28} />
            </IconButton>
          </FavButtonContainer>
        </TextFieldContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
