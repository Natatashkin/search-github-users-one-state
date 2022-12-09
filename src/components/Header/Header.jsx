import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import BackButton from "../BackButton/BackButton";
import StarIcon from "../icons/StarIcon/StarIcon";
import SearchIcon from "../icons/SearchIcon/SearchIcon";
import IconButton from "../IconButton/IconButton";
import PageTitle from "../PageTitle/PageTitle";
import Logo from "./Logo/Logo";
import TextField from "../TextField/TextField";
import { HEADER_TITLES } from "../../constants/constants";
import styles from "./Header.module.scss";
import variables from "../../styles/variables.scss";

const Header = ({ onGetQuery, showFavList, onFavClick, showSearch }) => {
  const [query, setQuery] = useState("");
  const [back, setBack] = useState(false);

  const favButtonColor = showFavList ? variables.yellow : variables.lightgrey;

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const title = showFavList
    ? HEADER_TITLES.favorites
    : showSearch
    ? HEADER_TITLES.search
    : HEADER_TITLES.user;

  useEffect(() => {
    if (title === HEADER_TITLES.user) {
      setBack(true);
      return;
    }

    setBack(false);
  }, [title]);

  const debouncedQuery = useDebouncedCallback(onGetQuery, 350);
  useEffect(() => {
    if (query.length > 2 || !query) {
      debouncedQuery(query);
    }
  }, [query]);

  return (
    <header
      className={classNames([
        styles.container,
        { [styles["container--isSearch"]]: showSearch },
      ])}
    >
      <div className={styles.logoAndTitleContainer}>
        {back && (
          <div className={styles.backButtonContainer}>
            <BackButton />
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
