import React from "react";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";

const SearchView = ({ list = [], favoritesOptions }) => {
  console.log("render SearchView");
  return (
    <div>
      {!!list && (
        <UsersList>
          {list.map((item) => {
            return (
              <UsersListItem
                key={String(item.id)}
                item={item}
                favoritesOptions={favoritesOptions}
              />
            );
          })}
        </UsersList>
      )}
    </div>
  );
};

export default SearchView;
