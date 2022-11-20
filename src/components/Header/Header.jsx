import React, { useState, useCallback } from "react";
import classNames from "classnames";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Logo } from "./Logo";
import { pageTitle } from "../../helpers";
import { TextField, IconRouteLink, PageTitle } from "../../components";
import styles from "./Header.module.scss";

const Header = ({ onGetQuery, location, isSearchPage, isUserPage }) => {
  const title = pageTitle(location, isUserPage);
  const [query, setQuery] = useState("");

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  }, []);

  return (
    <header
      className={classNames(styles.container, {
        [styles["container--isSearch"]]: isSearchPage,
      })}
    >
      <div className={styles.logoAndTitleContainer}>
        <Logo />
        <div
          className={classNames(styles.titleContainer, {
            [styles[`titleContainer--isSearch`]]: isSearchPage,
          })}
        >
          <PageTitle title={title} />
        </div>
      </div>
      {isSearchPage && (
        <div className={styles.textFieldContainer}>
          <TextField name="search" value={query} onChange={handleOnChange}>
            <IoSearchOutline size={20} className={styles.adornment} />
          </TextField>
          <div className={styles.favLinkContainer}>
            <IconRouteLink path="/favorites" state={{ from: location }}>
              <FaStar size={24} />
            </IconRouteLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
