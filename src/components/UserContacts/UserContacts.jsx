import React from "react";
import PropTypes from "prop-types";
import LocationIcon from "../icons/LocationIcon/LocationIcon";
import CompanyIcon from "../icons/CompanyIcon/CompanyIcon";
import EmailIcon from "../icons/EmailIcon/EmailIcon";
import styles from "./UserContacts.module.scss";

const UserContacts = ({ email, company, country }) => {
  return (
    <ul>
      {email && (
        <li className={styles.listItem}>
          <EmailIcon />
          <a href={`mailto:${email}`}>{email}</a>
        </li>
      )}

      {company && (
        <li className={styles.listItem}>
          <CompanyIcon />
          <span>{company}</span>
        </li>
      )}
      {country && (
        <li className={styles.listItem}>
          <LocationIcon />
          <span>{country}</span>
        </li>
      )}
    </ul>
  );
};

export default UserContacts;

UserContacts.propTypes = {
  email: PropTypes.string,
  company: PropTypes.string,
  country: PropTypes.string,
};
