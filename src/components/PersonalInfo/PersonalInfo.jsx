import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StarIcon from "../icons/StarIcon/StarIcon";
import EmailIcon from "../icons/EmailIcon/EmailIcon";
import CompanyIcon from "../icons/CompanyIcon/CompanyIcon";
import LocationIcon from "../icons/LocationIcon/LocationIcon";
import FollowersIcon from "../icons/FollowersIcon/FollowersIcon";
import DotIcon from "../icons/DotIcon/DotIcon";
import IconButton from "../IconButton/IconButton";
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
  const hasUsername = name || "No username";
  const iconColor = isFavorite ? variables.yellow : variables.lightgrey;
  const shouldRenderContacts = Boolean(email ?? company ?? location);

  return (
    <>
      {/* Block Name and favorite btn ------------------------*/}
      <div className={classNames([styles.nameContainer, styles.marginTop])}>
        <div className="name">
          <h2 className={styles.fullName}>{hasUsername}</h2>
          <h3 className={styles.username}>
            <a
              className={styles.link}
              href={html_url}
              target="_blank"
              rel="noreferrer"
              aria-label="See user profile on GitHub"
            >{`@${login}`}</a>
          </h3>
        </div>
        <div className={styles.favorite}>
          <IconButton
            onClick={onFavClick}
            ariaLabel="Add to Favorites"
            Icon={<StarIcon color={iconColor} size={24} />}
          />
        </div>
      </div>

      {/* Subscription Block --------------------------- */}
      <div className={classNames([styles.subscriptions, styles.marginTop])}>
        <FollowersIcon />
        <div className={styles.item}>
          <span className={styles.quantity}>{followers}</span>
          <span>followers</span>
        </div>
        <div className={styles.divider}>
          <DotIcon size={10} />
        </div>
        <div className={styles.item}>
          <span className={styles.quantity}>{following}</span>
          <span>following</span>
        </div>
      </div>

      {/* BIO Block ------------------------------------- */}
      {bio && (
        <div className={classNames([styles.userBio, styles.marginTop])}>
          <p className={styles.text}>{bio}</p>
        </div>
      )}

      {/* Contacts Block ------------------------------------ */}
      {shouldRenderContacts && (
        <ul className={styles.marginTop}>
          {email && (
            <li className={classNames([styles.listItem, styles.link])}>
              <EmailIcon />
              <a className={styles.link} href={`mailto:${email}`}>
                {email}
              </a>
            </li>
          )}
          {company && (
            <li className={styles.listItem}>
              <CompanyIcon />
              <span>{company}</span>
            </li>
          )}
          {location && (
            <li className={styles.listItem}>
              <LocationIcon />
              <span>{location}</span>
            </li>
          )}
        </ul>
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
