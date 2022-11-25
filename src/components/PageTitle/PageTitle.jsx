import React from "react";
import classNames from "classnames";
import styles from "./PageTitle.module.scss";

const PageTitle = ({ title }) => {
  return <h1 className={styles.pageTitle}>{title}</h1>;
};

export default PageTitle;
