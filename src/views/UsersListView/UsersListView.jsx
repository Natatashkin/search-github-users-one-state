import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";

const UsersListView = ({ list, onGetUser, handlers, showListSpinner }) => {
  console.log(handlers);
  return (
    <>
      <UsersList>
        {list?.map((item) => {
          return (
            <UsersListItem
              key={String(item.id)}
              item={item}
              onGetUser={onGetUser}
              handlers={handlers}
            />
          );
        })}
      </UsersList>
      <div className="options" style={{ height: "30px" }}>
        {showListSpinner && <Spinner size={7} />}
      </div>
    </>
  );
};

export default UsersListView;
