import React from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./IconRouteLink.module.scss";

const IconRouteLink = ({ path, state = null, children, ariaLabel }) => {
  return (
    // <Link
    //   to={path}
    //   state={state}
    //   className={styles.link}
    //   aria-label={ariaLabel}
    // >
    <a href="">{children}</a>

    // </Link>
  );
};

export default IconRouteLink;

IconRouteLink.propTypes = {
  path: PropTypes.string.isRequired,
  state: PropTypes.shape({
    from: PropTypes.object,
  }),
  children: PropTypes.node.isRequired,
};
