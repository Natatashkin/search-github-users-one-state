import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import IconRouteLink from "../IconRouteLink/IconRouteLink";
import PageTitle from "../PageTitle/PageTitle";
// import BackLink from "../BackLink/BackLink";
import Logo from "./Logo/Logo";
import TextField from "../TextField/TextField";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { SEARCH_PAGE_SHORT_TITLE } from "../../pages/constans";
import { pageTitle } from "../../helpers";
import { useWidth } from "../../hooks";
import styles from "./Header.module.scss";
import variables from "../../styles/variables.scss";

const BackLink = lazy(() => import("../BackLink/BackLink"));

const Header = ({ onGetQuery, location, isSearchPage, isUserPage }) => {
  const title = pageTitle(location, isUserPage);
  const [query, setQuery] = useState("");
  const { width } = useWidth();

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  }, []);

  const showShortTitle = useMemo(
    () => isSearchPage && width < variables.laptop,
    [width]
  );

  return (
    <header
      className={classNames(styles.container, {
        [styles["container--isSearch"]]: isSearchPage,
      })}
    >
      <div className={styles.logoAndTitleContainer}>
        {!isSearchPage && (
          <Suspense>
            <BackLink location={location} alternativePath="/" />
          </Suspense>
        )}
        <Logo />
        <div
          className={classNames(styles.titleContainer, {
            [styles[`titleContainer--isSearch`]]: isSearchPage,
          })}
        >
          <PageTitle title={showShortTitle ? SEARCH_PAGE_SHORT_TITLE : title} />
        </div>
      </div>
      {isSearchPage && (
        <div className={styles.textFieldContainer}>
          <TextField name="search" value={query} onChange={handleOnChange}>
            <IoSearchOutline size={20} className={styles.adornment} />
          </TextField>
          <div className={styles.favLinkContainer}>
            <IconRouteLink
              path="/favorites"
              state={{ from: location }}
              ariaLabel="Link to Favorites Page"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 576 512"
                color="#e8dc14"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                style="color: rgb(232, 220, 20);"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
              </svg>
            </IconRouteLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  onGetQuery: PropTypes.func.isRequired,
  location: PropTypes.object,
  isSearchPage: PropTypes.bool,
  isUserPage: PropTypes.object,
};
