import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Container.module.scss";

const Container = forwardRef(({ children, onScroll }, ref) => {
  return (
    <div className={styles.container} ref={ref} onScroll={onScroll}>
      {children}
    </div>
  );
});

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func,
};
