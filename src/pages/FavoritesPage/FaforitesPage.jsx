import React, { useRef } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useFavorites } from "../../hooks";
import { UsersList, UsersListItem, Container } from "../../components";
import { UserListContainer } from "./FavoritesPage.styled";

const FavoritesPage = () => {
  const location = useLocation();
  const { favorites } = useOutletContext();

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
              />
            );
          })}
        </UsersList>
      </UserListContainer>
    </Container>
  );
};

export default FavoritesPage;
