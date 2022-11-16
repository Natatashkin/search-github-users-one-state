import React from "react";
import {
  UsersList,
  UsersListItem,
  Container,
  BackLink,
} from "../../components";
import { UserListContainer } from "./FavoritesPage.styled";

const FavoritesPage = ({ location, favoritesOptions }) => {
  const { favorites } = favoritesOptions;
  return (
    <Container>
      <BackLink
        location={location}
        titlePart="to search"
        alternativePath="/search"
      />
      <UserListContainer>
        <UsersList>
          {favorites.map((item) => {
            return (
              <UsersListItem
                key={String(item.id)}
                item={item}
                location={location}
                favoritesOptions={favoritesOptions}
              />
            );
          })}
        </UsersList>
      </UserListContainer>
    </Container>
  );
};

export default FavoritesPage;
