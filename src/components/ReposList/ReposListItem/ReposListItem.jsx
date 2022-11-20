import React from "react";
import styles from "./ReposListItem.module.scss";

const ReposListItem = ({ repo, showDescription }) => {
  const { html_url, name } = repo;
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
