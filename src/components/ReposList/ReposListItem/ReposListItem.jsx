import classNames from "classnames";
import React from "react";
import styles from "./ReposListItem.module.scss";

const ReposListItem = ({ repo, showDescription, showItem }) => {
  const { html_url, name } = repo;
  console.log(showItem);
  return (
    <li className={styles.listItem}>
      <a href={html_url} target="_blank" rel="noreferrer">
        <h4>{name}</h4>
        <p>{showDescription}</p>
      </a>
    </li>
  );
};

export default ReposListItem;
