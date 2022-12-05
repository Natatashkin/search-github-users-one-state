import React from "react";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";

const SearchView = ({ list = [], favoritesOptions }) => {
  console.log("render");
  return (
    <div>
      {!!list && (
        <UsersList>
          {list.map((item) => {
            return (
              <UsersListItem
                key={String(item.id)}
                item={item}
                // location={location}
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
