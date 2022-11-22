import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Container.module.scss";
import { ButtonToTop } from "../../components";

const Container = forwardRef(({ children }, ref) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 150) {
      setShowTopBtn(true);
      return;
    }
    setShowTopBtn(false);
  };

  return (
    <div className={styles.container} ref={ref} onScroll={handleScroll}>
      {children}
      {showTopBtn && <ButtonToTop scrollRef={ref} />}
    </div>
  );
});

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
