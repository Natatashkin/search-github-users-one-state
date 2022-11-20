import React from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineMail, HiOutlineOfficeBuilding } from "react-icons/hi";
import styles from "./UserContacts.module.scss";

const UserContacts = ({ email, company, country }) => {
  return (
    <ul>
      {email && (
        <li className={styles.listItem}>
          <HiOutlineMail />
          <span>
            <a href={`mailto:${email}`}>{email}</a>
          </span>
        </li>
      )}
      {company && (
        <li className={styles.listItem}>
          <HiOutlineOfficeBuilding />
          <span>{company}</span>
        </li>
      )}
      {country && (
        <li className={styles.listItem}>
          <GrLocation />
          <span>{country}</span>
        </li>
      )}
    </ul>
  );
};

export default UserContacts;
