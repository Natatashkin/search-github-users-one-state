import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StarIcon from "../icons/StarIcon/StarIcon";
import UserSubscriptions from "../UserSubscriptions/UserSubscriptions";
import IconButton from "../IconButton/IconButton";
import UserName from "../UserName/UserName";
import UserContacts from "../UserContacts/UserContacts";
import UserBio from "../UserBio/UserBio";
import styles from "./PersonalInfo.module.scss";
import variables from "../../styles/variables.scss";

const PersonalInfo = ({ data, onFavClick }) => {
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
    isFavorite,
  } = data;
  const iconColor = isFavorite ? variables.yellow : variables.lightgrey;
  const shouldRenderContacts = Boolean(email ?? company ?? location);

  return (
    <>
      <div className={classNames([styles.nameContainer, styles.container])}>
        <UserName name={name} login={login} url={html_url} />
        <div>
          <IconButton
            onClick={onFavClick}
            ariaLabel="Add to Favorites"
            Icon={<StarIcon color={iconColor} size={24} />}
          />
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
    isFavorite: PropTypes.bool.isRequired,
  }),
};
