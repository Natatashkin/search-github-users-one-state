import React from "react";
import PropTypes from "prop-types";
import DropdownListItem from "./DropdownListItem/DropdownListItem";
import styles from "./DropdownList.module.scss";

const DropdownList = ({ repos, openList }) => {
  return (
    <ul className={styles.dropdown_list}>
      {repos.map((repo) => {
        const showDescription = repo.description || "No description";
        return (
          <DropdownListItem
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

export default DropdownList;

DropdownList.propTypes = {};
