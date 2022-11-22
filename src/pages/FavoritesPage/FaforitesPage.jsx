import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useScroll } from "../../hooks";
import { UsersList, UsersListItem, Container } from "../../components";

const FavoritesPage = ({ location, favoritesOptions }) => {
  const { favorites } = favoritesOptions;
  const scrollRef = useRef(null);

  return (
    <Container ref={scrollRef}>
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
    </Container>
  );
};

export default FavoritesPage;

FavoritesPage.propTypes = {
  location: PropTypes.object.isRequired,
  favoritesOptions: PropTypes.shape({
    favorites: PropTypes.array,
  }).isRequired,
};
