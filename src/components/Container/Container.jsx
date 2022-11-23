import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { ButtonToTop } from "../ButtonToTop";
import styles from "./Container.module.scss";
import { useScroll } from "../../hooks";

const Container = forwardRef(({ children, onScroll }, ref) => {
  const { showTopBtn, handleScrollTopClick } = useScroll({});
  return (
    <div className={styles.container} ref={ref} onScroll={onScroll}>
      {children}
    </div>
  );
});

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
