import React, { useRef } from "react";
import PropTypes, { arrayOf } from "prop-types";
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
  const { showTopBtn, onScroll, handleScrollTopClick } = useScroll({
    pageHandler: setPage,
    totalPages,
    loading,
  });

  const onTopClick = () => {
    handleScrollTopClick(scrollRef, 0);
  };

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
      {showTopBtn && <ButtonToTop onClick={onTopClick} />}
    </Container>
  );
};

export default SearchPage;

SearchPage.propTypes = {
  query: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  favoritesOptions: PropTypes.shape({
    favorites: PropTypes.arrayOf(PropTypes.object),
    setFavorites: PropTypes.func,
  }),
};
