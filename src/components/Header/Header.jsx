import React, { useState, useCallback, useEffect, useMemo } from "react";
import classNames from "classnames";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Logo, BackLink } from "../../components";
import { pageTitle } from "../../helpers";
import { TextField, IconRouteLink, PageTitle } from "../../components";
import styles from "./Header.module.scss";
import variables from "../../styles/variables.scss";

const TITLE_SEARCH_SHORT = "Search Users";

const Header = ({ onGetQuery, location, isSearchPage, isUserPage }) => {
  const title = pageTitle(location, isUserPage);
  const [query, setQuery] = useState("");
  const [width, setWidth] = useState(0);
  const showShortTitle = useMemo(
    () => isSearchPage && width < variables.laptop,
    [width]
  );

  const handleResize = useCallback(({ target }) => {
    setWidth(target.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window]);

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
        {!isSearchPage && <BackLink location={location} alternativePath="/" />}
        <Logo />
        <div
          className={classNames(styles.titleContainer, {
            [styles[`titleContainer--isSearch`]]: isSearchPage,
          })}
        >
          <PageTitle title={showShortTitle ? TITLE_SEARCH_SHORT : title} />
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
