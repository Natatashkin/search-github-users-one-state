import React from "react";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";

const FavoritesView = ({ favItems = [], favoritesOptions }) => {
  return (
    <div>
      <UsersList>
        {favItems.map((item) => {
          return (
            <UsersListItem
              key={String(item.id)}
              item={item}
              favoritesOptions={favoritesOptions}
            />
          );
        })}
      </UsersList>
    </div>
  );
};

export default FavoritesView;
