import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconButton } from "../../components";
import styles from "./ReposHeader.module.scss";

const ReposHeader = ({ showDropdownIcon, reposQuantity, onClick, open }) => {
  return (
    <div className={styles.container}>
      <p>
        Repositories: <span>{reposQuantity}</span>
      </p>
      {showDropdownIcon && (
        <div className={styles.buttonContainer}>
          <IconButton onClick={onClick}>
            {open ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ReposHeader;
