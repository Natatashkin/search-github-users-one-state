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
import styles from "./Header.module.scss";

// const BackLink = lazy(() => import("../BackLink/BackLink"));

const Header = ({ onGetQuery }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const debouncedQuery = useDebouncedCallback(onGetQuery, 350);

  useEffect(() => {
    if (query.length > 2 || !query) {
      debouncedQuery(query);
    }
  }, [query]);

  return (
    <header
      className={classNames([styles.container, styles["container--isSearch"]])}
    >
      <div className={styles.logoAndTitleContainer}>
        <Logo />
        <div
          className={classNames([
            styles.titleContainer,
            styles[`titleContainer--isSearch`],
          ])}
        >
          <PageTitle title="Search GitHub Users" />
        </div>
      </div>

      <div className={styles.textFieldContainer}>
        <TextField name="search" query={query} onChange={handleInputChange}>
          <SearchIcon size={20} color={styles.lightgrey} />
        </TextField>
        <div className={styles.favLinkContainer}>
          <IconButton type="click" ariaLabel="Open favorites users">
            <StarIcon size={24} />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {};
