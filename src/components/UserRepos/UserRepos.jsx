import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
import { useScroll } from "../../hooks";
import Spinner from "../Spinner/Spinner";
import ReposList from "../ReposList/ReposList";
import ReposListItem from "../ReposList/ReposListItem/ReposListItem";
import ReposHeader from "../ReposHeader/ReposHeader";
import styles from "./UserRepos.module.scss";

const HEADER_HEIGHT = 75;

const UserRepos = ({ reposQuantity, repos, scrollRef, showListSpinner }) => {
  const showDropdownIcon = Boolean(repos.length);
  const { handleScrollTopClick } = useScroll({});
  const [open, setOpen] = useState(false);
  const toggleOpenClick = () => setOpen((prev) => !prev);
  const reposRef = useRef(null);

  useEffect(() => {
    if (open) {
      const target = reposRef?.current;
      const targetHeight = target.getBoundingClientRect().top - HEADER_HEIGHT;
      handleScrollTopClick(scrollRef, targetHeight);
    }
  }, [open]);

  return (
    <div className={styles.container} ref={reposRef}>
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
          <div className={styles.listOptions}>
            {showListSpinner && <Spinner size={7} />}
          </div>
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
