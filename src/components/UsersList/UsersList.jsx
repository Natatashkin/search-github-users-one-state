import React from "react";
import PropTypes from "prop-types";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";
import styles from "./UserList.module.scss";

const UsersList = ({ list, onGetUser, onFavClick }) => {
  return (
    <ul className={styles.list}>
      {list?.map((item) => {
        return (
          <UsersListItem
            key={String(item.id)}
            item={item}
            onGetUser={onGetUser}
            onFavClick={onFavClick}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;

UsersList.propTypes = {
  children: PropTypes.node,
};
