import React, { lazy } from "react";
import UsersList from "../../components/UsersList/UsersList";
import styles from "./UsersListView.module.scss";

const Spinner = lazy(() => import("../../components/Spinner/Spinner"));

const UsersListView = ({
  list,
  onGetUser,
  onFavClick,
  showListSpinner,
  isEndOfList,
}) => {
  return (
    <>
      <UsersList list={list} onGetUser={onGetUser} onFavClick={onFavClick} />
      <div className={styles.listOptions}>
        {showListSpinner && <Spinner size={7} />}
        {isEndOfList && <p className={styles.finalText}>The end of list</p>}
      </div>
    </>
  );
};

export default UsersListView;
