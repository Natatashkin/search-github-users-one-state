import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";
import ArrowUpIcon from "../icons/ArrowUpIcon/ArrowUpIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon/ArrowDownIcon";
import ReposList from "../ReposList/ReposList";
import styles from "./UserRepos.module.scss";

const UserRepos = ({ reposQuantity, repos }) => {
  const showDropdownIcon = Boolean(repos.length);
  const [open, setOpen] = useState(false);
  const toggleOpenClick = () => setOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      {/* Repos header */}
      <div className={styles.repos_header}>
        <p className={styles.title}>
          Repositories: <span className={styles.quantity}>{reposQuantity}</span>
        </p>
        {showDropdownIcon && (
          <div className={styles.buttonContainer}>
            <IconButton
              onClick={toggleOpenClick}
              ariaLabel="Open user repos"
              Icon={
                open ? <ArrowUpIcon size={18} /> : <ArrowDownIcon size={18} />
              }
            />
          </div>
        )}
      </div>

      {/* Repos List */}
      {open && (
        <div className={styles.listContainer}>
          <ReposList repos={repos} openList={open} />
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
