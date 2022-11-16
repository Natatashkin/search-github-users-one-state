import React, { useRef } from "react";
import { handleScrollToTop } from "../../helpers";

import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  Button,
  ErrorMessage,
} from "../../components";
import { UserListContainer, ListOptions } from "./SearchPage.styled";

const SearchPage = ({
  location,
  handleScroll,
  showButton,
  searchPageOptions,
  favoritesOptions,
}) => {
  const listRef = useRef();
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
        <UserListContainer ref={listRef} onScroll={handleScroll}>
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
                  onClick={() => handleScrollToTop(listRef, 0)}
                />
              </div>
            )}
          </ListOptions>
        </UserListContainer>
      )}
    </Container>
  );
};

export default SearchPage;
