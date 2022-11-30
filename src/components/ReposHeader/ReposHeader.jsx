import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
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
            {open ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
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
