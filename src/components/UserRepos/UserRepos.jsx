import React, { useState } from "react";
import PropTypes from "prop-types";
import ReposList from "../ReposList/ReposList";
import ReposListItem from "../ReposList/ReposListItem/ReposListItem";
import ReposHeader from "../ReposHeader/ReposHeader";
import styles from "./UserRepos.module.scss";

const UserRepos = ({ reposQuantity, repos }) => {
  const showDropdownIcon = Boolean(repos.length);
  const [open, setOpen] = useState(false);
  const toggleOpenClick = () => setOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <ReposHeader
        showDropdownIcon={showDropdownIcon}
        reposQuantity={reposQuantity}
        onClick={toggleOpenClick}
        open={open}
      />
      {open && (
        <div className={styles.listContainer}>
          <ReposList>
            {repos.map((repo) => {
              const showDescription = repo.description || "No description";
              return (
                <ReposListItem
                  key={repo.id}
                  repo={repo}
                  showDescription={showDescription}
                  showItem={open}
                />
              );
            })}
          </ReposList>
        </div>
      )}
    </div>
  );
};

export default UserRepos;

UserRepos.propTypes = {
  reposQuantity: PropTypes.number.isRequired,
  repos: PropTypes.array,
  scrollRef: PropTypes.object,
  showListSpinner: PropTypes.bool,
};
