import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  useSearchParams,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UsersList, UsersListItem, Container } from "../../components";
// import debounce from "lodash.debounce";
import { useDebouncedCallback } from "use-debounce";
import * as ghApi from "../../api/ghApi";
import styled from "styled-components";

const UserListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const OptionsContainer = styled.div`
  height: 40px;
`;
const PER_PAGE = 15;

const SearchPage = ({ getCurrentUser }) => {
  const location = useLocation();
  const { searchQuery: query } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [showButton, setShowButton] = useState(false);

  const removeSearchParams = useCallback(() => {
    searchParams.delete("q");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const getTotalPages = useCallback(
    (totalCount) => {
      let pagesCount = 0;
      if (pagesCount === totalCount) {
        setError(`No users with username "${searchQuery}"`);
        return;
      }
      pagesCount = Math.ceil(totalCount / PER_PAGE);
      setTotalPages(pagesCount);
    },
    [searchQuery]
  );

  const makeSearchQuery = useCallback(
    async (data, page, per_page) => {
      setError("");
      try {
        setIsLoading(true);
        const { usersData, total } = await ghApi.searchUsers(
          data,
          page,
          per_page
        );
        getTotalPages(total);

        if (page > 1) {
          setUserList((prevList) => {
            return [...prevList, ...usersData];
          });
          setIsLoading(false);
          return;
        }

        setUserList(usersData);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    },
    [getTotalPages]
  );

  const debouncedRequest = useDebouncedCallback(makeSearchQuery, 500);

  const resetSearchState = () => {
    setUserList([]);
    setTotalPages(0);
    setPage(1);
  };

  useEffect(() => {
    setSearchQuery(query);
    resetSearchState();
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setSearchParams({ q: searchQuery });

      if (totalPages > 0 && totalPages < page) return;
      debouncedRequest(searchQuery, page, PER_PAGE);
      return;
    }
    removeSearchParams();
    setUserList([]);
  }, [searchQuery, page]);

  const handleScroll = ({ target }) => {
    const shouldUpdate =
      target.scrollHeight - Math.round(target.scrollTop) ===
      target.clientHeight;
    console.log(shouldUpdate);
    if (shouldUpdate) {
      console.log("надо обновлять");
      setPage((prevPage) => {
        return prevPage + 1;
      });
    }
  };
  console.log("query >>>", query);
  console.log("searchQuery", searchQuery);

  return (
    <Container>
      {loading && page < 2 && <h3>Loading...</h3>}
      {error && !loading && <h3>{error}</h3>}
      {userList && searchQuery && (
        <UserListContainer onScroll={handleScroll}>
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
          {/* <OptionsContainer>
            {loading && page > 1 && <h3>Loading...</h3>}
          </OptionsContainer> */}
        </UserListContainer>
      )}
    </Container>
  );
};

export default SearchPage;
