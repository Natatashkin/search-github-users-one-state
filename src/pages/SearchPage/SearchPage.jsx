import React, { useRef } from "react";
import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  ErrorMessage,
} from "../../components";
import styles from "./SearchPage.module.scss";

const SearchPage = ({
  location,
  onScroll,
  showTopBtn,
  searchPageOptions,
  favoritesOptions,
}) => {
  const scrollRef = useRef();
  const {
    error,
    userList,
    showSpinner,
    showError,
    showUserList,
    showListSpinner,
  } = searchPageOptions;

  return (
    <Container ref={scrollRef} onScroll={onScroll} showTopBtn={showTopBtn}>
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
