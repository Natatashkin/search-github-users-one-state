import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StarIcon from "../icons/StarIcon/StarIcon";
import SearchIcon from "../icons/SearchIcon/SearchIcon";
import IconButton from "../IconButton/IconButton";
import PageTitle from "../PageTitle/PageTitle";
import Logo from "./Logo/Logo";
import TextField from "../TextField/TextField";
// import { SEARCH_PAGE_SHORT_TITLE } from "../../pages/constans";
import { pageTitle } from "../../helpers";
// import { useWidth } from "../../hooks";
import styles from "./Header.module.scss";
// import variables from "../../styles/variables.scss";

const BackLink = lazy(() => import("../BackLink/BackLink"));

const Header = ({ query, onChange }) => {
  // const title = pageTitle(location, isUserPage);
  console.log(query);
  console.log(onChange);
  return (
    <header
      className={classNames([styles.container, styles["container--isSearch"]])}
    >
      <div className={styles.logoAndTitleContainer}>
        {/* {!isSearchPage && (
          <Suspense>
            <BackLink location={location} alternativePath="/" />
          </Suspense>
        )} */}
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
        <TextField name="search" value={query} onChange={onChange}>
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
