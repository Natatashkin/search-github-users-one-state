import React from "react";
import { useLocation } from "react-router-dom";
import { UsersList, UsersListItem, Container } from "../../components";
import { UserListContainer } from "./FavoritesPage.styled";

const FavoritesPage = ({ favoritesOptions }) => {
  const location = useLocation();
  const { favorites } = favoritesOptions;

  return (
    <Container>
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
