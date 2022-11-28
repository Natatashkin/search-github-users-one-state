import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FaStar } from "react-icons/fa";
import { useFavorites } from "../../hooks";
import {
  UserContacts,
  UserBio,
  UserSubscriptions,
  UserName,
  IconButton,
} from "../../components";
import styles from "./PersonalInfo.module.scss";

const PersonalInfo = ({ data, favoritesOptions }) => {
  const { favButtonColor, toggleFavoriteClick } = useFavorites(
    data,
    favoritesOptions
  );
  const {
    login,
    name,
    bio,
    followers,
    following,
    html_url,
    email,
    company,
    location,
  } = data;

  const shouldRenderContacts = Boolean(email ?? company ?? location);

  return (
    <>
      <div className={classNames([styles.nameContainer, styles.container])}>
        <UserName name={name} login={login} url={html_url} />
        <div>
          <IconButton onClick={toggleFavoriteClick}>
            <FaStar color={favButtonColor} size={24} />
          </IconButton>
        </div>
      </div>
      <div className={styles.container}>
        <UserSubscriptions followers={followers} following={following} />
      </div>
      {bio && (
        <div className={styles.container}>
          <UserBio text={bio} />
        </div>
      )}
      {shouldRenderContacts && (
        <div className={styles.container}>
          <UserContacts email={email} company={company} country={location} />
        </div>
      )}
    </>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  data: PropTypes.shape({
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    html_url: PropTypes.string.isRequired,
    email: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
  }),
  favoritesOptions: PropTypes.shape({
    favorites: PropTypes.arrayOf(PropTypes.object),
    setFavorites: PropTypes.func,
  }).isRequired,
};
