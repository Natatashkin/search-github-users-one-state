import React, { forwardRef } from "react";
import styles from "./Container.module.scss";

const Container = forwardRef(({ children }) => {
  return <div className={styles.container}>{children}</div>;
});

export default Container;
