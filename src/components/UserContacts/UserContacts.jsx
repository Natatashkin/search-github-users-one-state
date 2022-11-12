import React from "react";
import { Contacts, Item } from "./UserContacts.styled";
import { GrLocation } from "react-icons/gr";
import { HiOutlineMail, HiOutlineOfficeBuilding } from "react-icons/hi";

const UserContacts = ({ email, company, country }) => {
  return (
    <Contacts>
      {email && (
        <Item>
          <HiOutlineMail />
          <span>
            <a href={`mailto:${{ email }}`}>{email}</a>
          </span>
        </Item>
      )}
      {company && (
        <Item>
          <HiOutlineOfficeBuilding />
          <span>{company}</span>
        </Item>
      )}
      {country && (
        <Item>
          <GrLocation />
          <span>{country}</span>
        </Item>
      )}
    </Contacts>
  );
};

export default UserContacts;
