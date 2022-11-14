import React, { useState, useCallback, useRef, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { useFetchUsers } from "../../hooks";
import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  Button,
  ErrorMessage,
} from "../../components";
import { UserListContainer, ListOptions } from "./SearchPage.styled";

const SearchPage = forwardRef(
  (
    {
      location,
      handleScroll,
      handleScrollToTop,
      showButton,
      searchPageOptions,
      favoritesOptions,
    },
    ref
  ) => {
    const {
      error,
      userList,
      showSpinner,
      showError,
      showUserList,
      showListSpinner,
    } = searchPageOptions;

    return (
      <Container>
        {showSpinner && <Spinner />}
        {showError && <ErrorMessage message={error} />}
        {showUserList && (
          <UserListContainer ref={ref} onScroll={handleScroll}>
            <UsersList>
              {userList.map((item) => {
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
            <ListOptions>
              {showListSpinner && <Spinner size={7} />}
              {showButton && (
                <div>
                  <Button
                    title="Back to top"
                    type="button"
                    onClick={handleScrollToTop}
                  />
                </div>
              )}
            </ListOptions>
          </UserListContainer>
        )}
      </Container>
    );
  }
);

export default SearchPage;
