import React from "react";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";

const UsersListView = ({ list, onGetUser, onFavClick }) => {
  return (
    <UsersList>
      {list.map((item) => {
        return (
          <UsersListItem
            key={String(item.id)}
            item={item}
            onGetUser={onGetUser}
            onFavClick={onFavClick}
          />
        );
      })}
    </UsersList>
  );
};

export default UsersListView;
