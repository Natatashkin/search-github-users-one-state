import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { handleScrollToTop } from "../../helpers";
import {
  ReposList,
  ReposListItem,
  ReposHeader,
  Spinner,
} from "../../components";
import styles from "./UserRepos.module.scss";

const HEADER_HEIGHT = 75;

const UserRepos = ({
  reposQuantity,
  repos,
  userViewRef,
  showListSpinner,
  showList,
}) => {
  const showDropdownIcon = Boolean(repos.length);
  const [open, setOpen] = useState(false);
  const toggleOpenClick = () => setOpen((prev) => !prev);
  const reposRef = useRef(null);

  useEffect(() => {
    if (open) {
      const target = reposRef?.current;
      const targetHeight = target.getBoundingClientRect().top - HEADER_HEIGHT;
      handleScrollToTop(userViewRef, targetHeight);
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
