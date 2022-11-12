import React from "react";
import { UserContacts } from "../UserContacts";
import { UserBio } from "../UserBio";
import { UserSubscriptions } from "../UserSubscriptions";
import {
  PersonalInfoContainer,
  SubscriptionsContainer,
  BioContainer,
  ContactsContainer,
} from "./PersonalInfo.styled";

const PersonalInfo = ({ data }) => {
  console.log(data);
  const {
    login,
    name,
    bio,
    followers,
    following,
    html_url,
    email,
    company,
    location,
  } = data;

  const hasUsername = name ? name : "No username";
  const shouldRenderContacts = Boolean(email ?? company ?? location);

  return (
    <PersonalInfoContainer>
      {<h3>{hasUsername}</h3>}
      <h4>
        <a href={html_url} target="_blank" rel="noreferrer">{`@${login}`}</a>
      </h4>
      <SubscriptionsContainer>
        <UserSubscriptions followers={followers} following={following} />
      </SubscriptionsContainer>
      {bio && (
        <BioContainer>
          <UserBio text={bio} />
        </BioContainer>
      )}
      {shouldRenderContacts && (
        <ContactsContainer>
          <UserContacts email={email} company={company} country={location} />
        </ContactsContainer>
      )}
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;
