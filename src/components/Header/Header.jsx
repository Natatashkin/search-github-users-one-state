import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StarIcon from "../icons/StarIcon/StarIcon";
import SearchIcon from "../icons/SearchIcon/SearchIcon";
import IconRouteLink from "../IconRouteLink/IconRouteLink";
import PageTitle from "../PageTitle/PageTitle";
import Logo from "./Logo/Logo";
import TextField from "../TextField/TextField";
// import { SEARCH_PAGE_SHORT_TITLE } from "../../pages/constans";
import { pageTitle } from "../../helpers";
// import { useWidth } from "../../hooks";
import styles from "./Header.module.scss";
// import variables from "../../styles/variables.scss";

const BackLink = lazy(() => import("../BackLink/BackLink"));

const Header = ({ onGetQuery, location, isSearchPage, isUserPage }) => {
  const title = pageTitle(location, isUserPage);
  const [query, setQuery] = useState("");
  // const { width } = useWidth();

  const handleOnChange = useCallback(({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  }, []);
  console.log(styles);
  // const showShortTitle = useMemo(
  //   () => isSearchPage && width < variables.laptop,
  //   [width]
  // );

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
          <PageTitle title={title} />
        </div>
      </div>
      {isSearchPage && (
        <div className={styles.textFieldContainer}>
          <TextField name="search" value={query} onChange={handleOnChange}>
            <SearchIcon size={20} color={styles.lightgrey} />
            {/* <IoSearchOutline size={20} className={styles.adornment} /> */}
          </TextField>
          <div className={styles.favLinkContainer}>
            <IconRouteLink
              path="/favorites"
              state={{ from: location }}
              ariaLabel="Link to Favorites Page"
            >
              <StarIcon size={24} />
              {/* <FaStar size={24} /> */}
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
