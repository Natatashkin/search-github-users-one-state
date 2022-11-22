import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Container.module.scss";
import { ButtonToTop } from "../../components";

const Container = forwardRef(({ children, onScroll, showTopBtn }, ref) => {
  return (
    <div className={styles.container} ref={ref} onScroll={onScroll}>
      {children}
      {showTopBtn && <ButtonToTop scrollRef={ref} />}
    </div>
  );
});

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
