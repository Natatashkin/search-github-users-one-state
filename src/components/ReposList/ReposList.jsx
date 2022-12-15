import React from "react";
import PropTypes from "prop-types";
import ReposListItem from "./ReposListItem/ReposListItem";
import styles from "./ReposList.module.scss";

const ReposList = ({ repos, openList }) => {
  return (
    <ul className={styles.list}>
      {repos.map((repo) => {
        const showDescription = repo.description || "No description";
        return (
          <ReposListItem
            key={repo.id}
            repo={repo}
            showDescription={showDescription}
            showItem={openList}
          />
        );
      })}
    </ul>
  );
};

export default ReposList;

ReposList.propTypes = {};
