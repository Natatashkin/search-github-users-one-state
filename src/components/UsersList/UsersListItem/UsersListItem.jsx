import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useFavorites } from "../../../hooks";
import { UserAvatar, IconButton } from "../../../components";
import styles from "./UsersListItem.module.scss";

const UsersListItem = ({ item, location, favoritesOptions }) => {
  const { name, login, avatar_url, bio, followers, following, public_repos } =
    item;
  const { favButtonColor, toggleFavoriteClick } = useFavorites(
    item,
    favoritesOptions
  );
  const username = name ? name : login;

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <Link
          to={`/user/${login}`}
          state={{ from: location }}
          className={styles.link}
        >
          <div className={styles.avatar}>
            <UserAvatar url={avatar_url} name={username} size="60" />
          </div>
          <div className={styles.info}>
            <h2>{username}</h2>
            <p>{bio}</p>
          </div>
        </Link>
        <div className={styles.favorite}>
          <IconButton type="button" onClick={toggleFavoriteClick}>
            <FaStar color={favButtonColor} size={24} />
          </IconButton>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.stats}>
          <h3>followers</h3>
          <p>{followers}</p>
        </div>
        <div className={styles.stats}>
          <h3>following</h3>
          <p>{following}</p>
        </div>
        <div className={styles.stats}>
          <h3>repos</h3>
          <p>{public_repos}</p>
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
