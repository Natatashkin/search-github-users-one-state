import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Logo, BackLink } from "../../components";
import { pageTitle } from "../../helpers";
import { useWidth } from "../../hooks";
import { TextField, IconRouteLink, PageTitle } from "../../components";
import { SEARCH_PAGE_SHORT_TITLE } from "../../pages/constans";
import styles from "./Header.module.scss";
import variables from "../../styles/variables.scss";

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
        {!isSearchPage && <BackLink location={location} alternativePath="/" />}
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

Header.propTypes = {
  onGetQuery: PropTypes.func,
  location: PropTypes.object.isRequired,
  isSearchPage: PropTypes.bool.isRequired,
  isUserPage: PropTypes.object,
};
