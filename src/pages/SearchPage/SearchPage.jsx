import React, { useRef } from "react";
import { useScroll, useFetchUsers } from "../../hooks";
import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  ErrorMessage,
  ButtonToTop,
} from "../../components";
import styles from "./SearchPage.module.scss";

const SearchPage = ({ query, location, favoritesOptions }) => {
  const {
    error,
    userList,
    showSpinner,
    showError,
    showUserList,
    showListSpinner,
    setPage,
    loading,
    totalPages,
  } = useFetchUsers({ query });

  const scrollRef = useRef(null);
  const { onScroll } = useScroll({
    pageHandler: setPage,
    totalPages,
    loading,
  });

  return (
    <Container ref={scrollRef} onScroll={onScroll}>
      {showSpinner && <Spinner />}
      {showError && <ErrorMessage message={error} />}
      {showUserList && (
        <>
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
          <div className={styles.userListOptions}>
            {showListSpinner && <Spinner size={7} />}
          </div>
        </>
      )}
    </Container>
  );
};

export default SearchPage;
