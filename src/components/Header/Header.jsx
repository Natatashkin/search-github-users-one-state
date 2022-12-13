import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import { useDebouncedCallback } from "use-debounce";
import BackIcon from "../icons/BackIcon/BackIcon";
import StarIcon from "../icons/StarIcon/StarIcon";
import SearchIcon from "../icons/SearchIcon/SearchIcon";
import Logo from "./Logo/Logo";
import PageTitle from "../PageTitle/PageTitle";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import { BACK_BUTTON_TITLE, HEADER_TITLES } from "../../constants/constants";
import styles from "./Header.module.scss";
import variables from "../../styles/variables.scss";

const Header = ({
  showSearch,
  onSendRequest,
  showFavList,
  onFavClick,
  showBackButton,
  onBackButtonClick,
}) => {
  const [query, setQuery] = useState("");
  const favButtonColor = showFavList ? variables.yellow : variables.lightgrey;

  const title = showFavList
    ? HEADER_TITLES.favorites
    : showSearch
    ? HEADER_TITLES.search
    : HEADER_TITLES.user;

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  useEffect(() => {
    onSendRequest(query);
  }, [query]);

  return (
    <header
      className={classNames([
        styles.container,
        { [styles["container--isSearch"]]: showSearch },
      ])}
    >
      <div className={styles.logoAndTitleContainer}>
        {showBackButton && (
          <div className={styles.backButtonContainer}>
            <Button
              title={BACK_BUTTON_TITLE}
              ariaLabel="Back button"
              type="button"
              onClick={onBackButtonClick}
            >
              <BackIcon />
            </Button>
          </div>
        )}
        <Logo />
        <div
          className={classNames([
            styles.titleContainer,
            { [styles[`titleContainer--isSearch`]]: showSearch },
          ])}
        >
          <PageTitle title={title} />
        </div>
      </div>

      <div
        className={classNames([
          styles.textFieldContainer,
          { [styles.alignRight]: !showSearch },
        ])}
      >
        {showSearch && (
          <TextField name="search" query={query} onChange={handleInputChange}>
            <SearchIcon size={20} color={styles.lightgrey} />
          </TextField>
        )}

        <div className={styles.favLinkContainer}>
          <IconButton
            type="click"
            ariaLabel="Open favorites users"
            onClick={onFavClick}
          >
            <StarIcon size={24} color={favButtonColor} />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {};
