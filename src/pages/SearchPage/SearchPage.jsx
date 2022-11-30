import React, { lazy, Suspense, useRef } from "react";
import PropTypes from "prop-types";
import { useScroll, useFetchUsers } from "../../hooks";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";
import Spinner from "../../components/Spinner/Spinner";
// import ButtonToTop from "../../components/ButtonToTop/ButtonToTop";
import Container from "../../components/Container/Container";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./SearchPage.module.scss";

const ButtonToTop = lazy(() =>
  import("../../components/ButtonToTop/ButtonToTop")
);
const ErrorMessage = lazy(() =>
  import("../../components/ErrorMessage/ErrorMessage")
);

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
      {showError && (
        <Suspense>
          <ErrorMessage message={error} />
        </Suspense>
      )}
      {!!showUserList && (
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
      {showTopBtn && (
        <Suspense>
          <ButtonToTop onClick={onTopClick} />
        </Suspense>
      )}
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
