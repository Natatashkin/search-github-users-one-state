import React, { useState, useCallback, useRef } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useFavorites } from "../../hooks";
import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  Button,
  ErrorMessage,
} from "../../components";
import { UserListContainer } from "./FavoritesPage.styled";

const FavoritesPage = () => {
  const location = useLocation();
  const listRef = useRef(null);
  const { favorites } = useOutletContext();

  const handleScrollToTop = () => {
    listRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <UserListContainer ref={listRef} /*onScroll={handleScroll}*/>
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
        {/* <ListOptions> */}
        {/* {showButton && (
              <div>
                <Button
                  title="Back to top"
                  type="button"
                  onClick={handleScrollToTop}
                />
              </div>
            )} */}
        {/* </ListOptions> */}
      </UserListContainer>
      {/* )} */}
    </Container>
  );
};

export default FavoritesPage;
