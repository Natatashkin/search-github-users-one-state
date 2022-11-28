import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useScroll } from "../../hooks";
import UsersList from "../../components/UsersList/UsersList";
import UsersListItem from "../../components/UsersList/UsersListItem/UsersListItem";
import ButtonToTop from "../../components/ButtonToTop/ButtonToTop";
import Container from "../../components/Container/Container";

const FavoritesPage = ({ location, favoritesOptions }) => {
  const { favorites } = favoritesOptions;
  const scrollRef = useRef(null);
  const { showTopBtn, onScroll, handleScrollTopClick } = useScroll({});

  const onTopClick = () => {
    handleScrollTopClick(scrollRef, 0);
  };

  return (
    <Container ref={scrollRef} onScroll={onScroll}>
      <UsersList>
        {favorites.map((item) => {
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
      {showTopBtn && <ButtonToTop onClick={onTopClick} />}
    </Container>
  );
};

export default FavoritesPage;

FavoritesPage.propTypes = {
  location: PropTypes.object.isRequired,
  favoritesOptions: PropTypes.shape({
    favorites: PropTypes.array.isRequired,
    setFavorites: PropTypes.func.isRequired,
  }).isRequired,
};
