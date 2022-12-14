import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useThrottledCallback } from "use-debounce";
import BackIcon from "../icons/BackIcon/BackIcon";
import StarIcon from "../icons/StarIcon/StarIcon";
import SearchIcon from "../icons/SearchIcon/SearchIcon";
import Logo from "./Logo/Logo";
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
  const [width, setWidth] = useState(null);
  const favButtonColor = showFavList ? variables.yellow : variables.lightgrey;

  const title = showFavList
    ? HEADER_TITLES.FAVORITES_TITLE
    : showSearch
    ? width < variables.laptop
      ? HEADER_TITLES.SHIRT_SEARCH_TITLE
      : HEADER_TITLES.SEARCH_TITLE
    : HEADER_TITLES.USER_TITLE;

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  //
  const onGetWidth = (e) => {
    setWidth(e.target.innerWidth);
  };
  const throttledWidth = useThrottledCallback(onGetWidth, 150);

  useEffect(() => {
    window.addEventListener("resize", throttledWidth);
    return () => window.removeEventListener("resize", throttledWidth);
  }, []);

  useEffect(() => {
    onSendRequest(query);
  }, [query]);

  console.log(width);

  return (
    <header
      className={classNames([
        styles.container,
        { [styles.container__isSearch]: showSearch },
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
              Icon={<BackIcon />}
            />
          </div>
        )}
        <Logo />
        <div
          className={classNames([
            styles.titleContainer,
            { [styles.titleContainer__isSearch]: showSearch },
          ])}
        >
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>
      </div>

      <div
        className={classNames([
          styles.textFieldContainer,
          { [styles.alignRight]: !showSearch },
        ])}
      >
        {showSearch && (
          <TextField
            name="search"
            query={query}
            onChange={handleInputChange}
            Icon={<SearchIcon size={20} color={styles.lightgrey} />}
          />
        )}

        <div className={styles.favLinkContainer}>
          <IconButton
            type="click"
            ariaLabel="Open favorites users"
            onClick={onFavClick}
            Icon={<StarIcon size={24} color={favButtonColor} />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  onSendRequest: PropTypes.func.isRequired,
  showFavList: PropTypes.bool.isRequired,
  onFavClick: PropTypes.func.isRequired,
  showBackButton: PropTypes.bool.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
};
