import React, { forwardRef } from "react";
import styles from "./UserList.module.scss";

const UsersList = forwardRef(({ children }, ref) => {
  return (
    <div ref={ref}>
      <ul className={styles.list}>{children}</ul>;
    </div>
  );
});

export default UsersList;
