import React from "react";
import { FaStar } from "react-icons/fa";
import { UserContacts } from "../UserContacts";
import { UserBio } from "../UserBio";
import { UserSubscriptions } from "../UserSubscriptions";
import { UserName } from "../UserName";
import { IconButton } from "../IconButton";
import { useFavorites } from "../../hooks";
import {
  PersonalInfoContainer,
  SubscriptionsContainer,
  BioContainer,
  ContactsContainer,
  NameContainer,
} from "./PersonalInfo.styled";

const PersonalInfo = ({ data }) => {
  const { isFavButtonActive, toggleFavoriteClick } = useFavorites(data);
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

  const shouldRenderContacts = Boolean(email ?? company ?? location);

  return (
    <PersonalInfoContainer>
      <NameContainer>
        <UserName name={name} login={login} url={html_url} />
        <div>
          <IconButton onClick={toggleFavoriteClick}>
            <FaStar color={isFavButtonActive} size={24} />
          </IconButton>
        </div>
      </NameContainer>
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
