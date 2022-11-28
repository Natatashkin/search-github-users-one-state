import React from "react";
import PropTypes from "prop-types";
import styles from "./PageTitle.module.scss";

const PageTitle = ({ title }) => {
  return <h1 className={styles.pageTitle}>{title}</h1>;
};

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
