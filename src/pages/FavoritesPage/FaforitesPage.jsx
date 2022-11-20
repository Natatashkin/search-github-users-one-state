import React, { useRef } from "react";

import {
  UsersList,
  UsersListItem,
  Container,
  BackLink,
} from "../../components";

const FavoritesPage = ({ location, favoritesOptions }) => {
  const { favorites } = favoritesOptions;
  const scrollRef = useRef(null);

  return (
    <Container ref={scrollRef}>
      {/* <BackLink
        location={location}
        titlePart="to search"
        alternativePath="/search"
      /> */}
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
