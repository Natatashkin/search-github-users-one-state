import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../UserAvatar/UserAvatar";
import IconButton from "../../IconButton/IconButton";
import StarIcon from "../../icons/StarIcon/StarIcon";
import styles from "./UsersListItem.module.scss";
import variables from "../../../styles/variables.scss";

const UsersListItem = ({ item, onGetUser, onFavClick }) => {
  const {
    name,
    login,
    avatar_url,
    bio,
    isFavorite,
    followers,
    following,
    public_repos,
  } = item;

  const username = name || login;
  const iconColor = isFavorite ? variables.yellow : variables.lightgrey;
  const userStats = [
    { name: "followers", data: followers },
    { name: "following", data: following },
    { name: "repos", data: public_repos },
  ];
  return (
    <li className={styles.card}>
      <div className={styles.container}>
        <div className={styles.userinfo} onClick={() => onGetUser(item)}>
          <div className={styles.avatar}>
            <UserAvatar url={avatar_url} name={username} size="small" />
          </div>
          <div className={styles.info}>
            <h2>{username}</h2>
            <p>{bio}</p>
          </div>
        </div>
        <div className={styles.favorite}>
          <IconButton
            type="button"
            onClick={() => onFavClick(item)}
            ariaLabel="Add to Favorites"
            Icon={<StarIcon color={iconColor} size={24} />}
          />
        </div>
      </div>
      <div className={styles.container}>
        {userStats.map(({ name, data }) => {
          return (
            <div key={name} className={styles.stats}>
              <h3>{name}</h3>
              <p>{data}</p>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default UsersListItem;

UsersListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    login: PropTypes.string,
    avatar_url: PropTypes.string.isRequired,
    bio: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    public_repos: PropTypes.number,
  }),
  favoritesOptions: PropTypes.shape({
    favorites: PropTypes.arrayOf(PropTypes.object),
    setFavorites: PropTypes.func,
  }),
};
