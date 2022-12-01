import React from "react";
import PropTypes from "prop-types";
import ArrowUpIcon from "../icons/ArrowUpIcon/ArrowUpIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon/ArrowDownIcon";
import IconButton from "../IconButton/IconButton";
import styles from "./ReposHeader.module.scss";

const ReposHeader = ({ showDropdownIcon, reposQuantity, onClick, open }) => {
  return (
    <div className={styles.container}>
      <p>
        Repositories: <span>{reposQuantity}</span>
      </p>
      {showDropdownIcon && (
        <div className={styles.buttonContainer}>
          <IconButton onClick={onClick} ariaLabel="Open user repos">
            {open ? <ArrowUpIcon size={18} /> : <ArrowDownIcon size={18} />}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ReposHeader;

ReposHeader.propTypes = {
  showDropdownIcon: PropTypes.bool.isRequired,
  reposQuantity: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
