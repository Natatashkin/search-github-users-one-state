import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import StarIcon from "../icons/StarIcon/StarIcon";
import SearchIcon from "../icons/SearchIcon/SearchIcon";
import IconButton from "../IconButton/IconButton";
import PageTitle from "../PageTitle/PageTitle";
import Logo from "./Logo/Logo";
import TextField from "../TextField/TextField";
import { HEADER_TITLES } from "../../constants/constants";
import styles from "./Header.module.scss";
import variables from "../../styles/variables.scss";

// const BackLink = lazy(() => import("../BackLink/BackLink"));

const Header = ({ onGetQuery, onFavClick }) => {
  const [query, setQuery] = useState("");
  const [favClick, setFavClick] = useState(false);

  const handleFavClick = () => setFavClick((prevClick) => !prevClick);

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const debouncedQuery = useDebouncedCallback(onGetQuery, 350);
  const favButtonColor = favClick ? variables.yellow : variables.lightgrey;
  const title = favClick ? HEADER_TITLES.favorites : HEADER_TITLES.search;

  useEffect(() => {
    if (query.length > 2 || !query) {
      debouncedQuery(query);
    }
  }, [query]);

  useEffect(() => {
    onFavClick(favClick);
  }, [favClick]);

  return (
    <header
      className={classNames([
        styles.container,
        { [styles["container--isSearch"]]: !favClick },
      ])}
    >
      <div className={styles.logoAndTitleContainer}>
        <Logo />
        <div
          className={classNames([
            styles.titleContainer,
            styles[`titleContainer--isSearch`],
          ])}
        >
          <PageTitle title={title} />
        </div>
      </div>

      <div
        className={classNames([
          styles.textFieldContainer,
          { [styles.alignRight]: favClick },
        ])}
      >
        {!favClick && (
          <TextField name="search" query={query} onChange={handleInputChange}>
            <SearchIcon size={20} color={styles.lightgrey} />
          </TextField>
        )}

        <div className={styles.favLinkContainer}>
          <IconButton
            type="click"
            ariaLabel="Open favorites users"
            onClick={handleFavClick}
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
