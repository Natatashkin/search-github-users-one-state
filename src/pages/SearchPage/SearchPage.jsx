import React, { useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useFetchUsers } from "../../hooks";
import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  Button,
} from "../../components";
import { UserListContainer, ListOptions } from "./SearchPage.styled";

const SearchPage = ({ getCurrentUser }) => {
  const location = useLocation();
  const listRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const {
    error,
    userList,
    showSpinner,
    showError,
    showUserList,
    showListSpinner,
    setPage,
  } = useFetchUsers({ setShowButton });

  const handleScroll = useCallback(
    ({ target }) => {
      const shouldUpdate =
        target.scrollHeight - Math.ceil(target.scrollTop) <=
        target.clientHeight;

      if (shouldUpdate) {
        setPage((prevPage) => {
          return prevPage + 1;
        });
      }
    },
    [setPage]
  );

  const handleScrollToTop = (e) => {
    listRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      {showSpinner && <Spinner />}
      {showError && <h3>{error}</h3>}
      {showUserList && (
        <UserListContainer ref={listRef} onScroll={handleScroll}>
          <UsersList>
            {userList.map((item) => {
              return (
                <UsersListItem
                  key={String(item.id)}
                  item={item}
                  location={location}
                />
              );
            })}
          </UsersList>
          <ListOptions>
            {showListSpinner && <Spinner size={7} />}
            {showButton && (
              <Button
                title="Back to top"
                type="button"
                onClick={handleScrollToTop}
              />
            )}
          </ListOptions>
        </UserListContainer>
      )}
    </Container>
  );
};

export default SearchPage;
