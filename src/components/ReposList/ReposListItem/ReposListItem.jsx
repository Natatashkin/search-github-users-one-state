import React from "react";
import PropTypes from "prop-types";
import styles from "./ReposListItem.module.scss";

const ReposListItem = ({ repo, showDescription }) => {
  const { html_url, name } = repo;
  return (
    <li className={styles.listItem}>
      <a
        href={html_url}
        target="_blank"
        rel="noreferrer"
        aria-label="See that repo on GitHub"
      >
        <h4 className={styles.itemTitle}>{name}</h4>
        <p className={styles.itemDescription}>{showDescription}</p>
      </a>
    </li>
  );
};

export default ReposListItem;

ReposListItem.propTypes = {
  repo: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  showDescription: PropTypes.string.isRequired,
};
