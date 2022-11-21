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
import styles from "./SearchPage.module.scss";

const SearchPage = ({
  location,
  onScroll,
  showButton,
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
            {showButton && (
              <>
                <Button
                  title="Back to top"
                  type="button"
                  onClick={() => handleScrollToTop(scrollRef, 0)}
                />
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default SearchPage;
