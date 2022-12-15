import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";
import ArrowUpIcon from "../icons/ArrowUpIcon/ArrowUpIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon/ArrowDownIcon";
import DropdownList from "./DropdownList/DropdownList";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ reposQuantity, repos }) => {
  const [open, setOpen] = useState(false);
  const toggleOpenClick = () => setOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.dropdown_header}>
        <p className={styles.title}>
          Repositories: <span className={styles.quantity}>{reposQuantity}</span>
        </p>

        <div className={styles.dropdown_button}>
          <IconButton
            onClick={toggleOpenClick}
            ariaLabel="Open user repos"
            Icon={
              open ? <ArrowUpIcon size={18} /> : <ArrowDownIcon size={18} />
            }
          />
        </div>
      </div>

      {open && (
        <div className={styles.dropdown_list_container}>
          <DropdownList repos={repos} openList={open} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  reposQuantity: PropTypes.number.isRequired,
  repos: PropTypes.array,
  scrollRef: PropTypes.object,
  showListSpinner: PropTypes.bool,
};
