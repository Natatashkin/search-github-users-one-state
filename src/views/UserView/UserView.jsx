import React from "react";
import UserRepos from "../../components/UserRepos/UserRepos";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./UserView.module.scss";

const UserView = ({ user, onFavClick }) => {
  const { login, avatar_url, name, public_repos } = user || {};

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <UserAvatar url={avatar_url} name={name} size="large" />
      </div>
      <PersonalInfo data={user} onFavClick={onFavClick} />
      <UserRepos reposQuantity={public_repos} />
    </div>
  );
};

export default UserView;
