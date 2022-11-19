import React from "react";
import { FaStar } from "react-icons/fa";
import {
  UserContacts,
  UserBio,
  UserSubscriptions,
  UserName,
  IconButton,
} from "../../components";

import { useFavorites } from "../../hooks";
import {
  PersonalInfoContainer,
  SubscriptionsContainer,
  BioContainer,
  ContactsContainer,
  NameContainer,
} from "./PersonalInfo.styled";
import styles from "./PersonalInfo.module.scss";

const PersonalInfo = ({ data, favoritesOptions }) => {
  const { favButtonColor, toggleFavoriteClick } = useFavorites(
    data,
    favoritesOptions
  );
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
      <div className={styles.nameContainer}>
        <UserName name={name} login={login} url={html_url} />
        <div>
          <IconButton onClick={toggleFavoriteClick}>
            <FaStar color={favButtonColor} size={24} />
          </IconButton>
        </div>
      </div>
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
