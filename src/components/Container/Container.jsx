import React, { forwardRef } from "react";
import styles from "./Container.module.scss";

const Container = forwardRef(({ children }, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      {children}
    </div>
  );
});

export default Container;
