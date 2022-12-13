import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import UsersList from "../../components/UsersList/UsersList";

const UsersListView = ({ list, onGetUser, onFavClick }) => {
  return (
    <>
      <UsersList list={list} onGetUser={onGetUser} onFavClick={onFavClick} />
      {/* <div className="options" style={{ height: "30px" }}>
        {showListSpinner && <Spinner size={7} />}
      </div> */}
    </>
  );
};

export default UsersListView;
