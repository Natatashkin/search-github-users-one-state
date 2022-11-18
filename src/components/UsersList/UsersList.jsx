import React, { forwardRef } from "react";
// import { List } from "./UsersList.styled";
import styles from "./UserList.module.scss";

const UsersList = forwardRef(({ children }, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      <ul className={styles.list}>{children}</ul>;
    </div>
  );
});

export default UsersList;
