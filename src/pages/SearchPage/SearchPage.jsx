import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  useSearchParams,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UsersList, UsersListItem, Container } from "../../components";
import debounce from "lodash.debounce";
import * as ghApi from "../../api/ghApi";
import styled from "styled-components";

const UserListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const OptionsContainer = styled.div`
  height: 40px;
`;

const SearchPage = ({ getCurrentUser }) => {
  const location = useLocation();
  const { searchQuery: query } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);

  const removeSearchParams = useCallback(() => {
    searchParams.delete("q");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const makeSearchQuery = useCallback(async (data, page) => {
    try {
      setIsLoading(true);
      const users = await ghApi.searchUsers(data, page);
      if (page > 1) {
        setUserList((prevList) => {
          return [...prevList, ...users];
        });
        setIsLoading(false);
        return;
      }
      setUserList(users);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const debouncedRequest = useCallback(debounce(makeSearchQuery, 500));

  useEffect(() => {
    setSearchQuery(query);
    setUserList([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setSearchParams({ q: searchQuery });
      debouncedRequest(searchQuery, page);
      return;
    }
    removeSearchParams();
    setUserList([]);
  }, [searchQuery, page]);

  const handleScroll = ({ target }) => {
    const shouldUpdate =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (loading && shouldUpdate) return;
    if (shouldUpdate) {
      setPage((prevPage) => {
        return prevPage + 1;
      });
    }
  };

  return (
    <Container>
      {loading && page < 2 && <h3>Loading...</h3>}
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
          <OptionsContainer>
            {loading && page > 1 && <h3>Loading...</h3>}
          </OptionsContainer>
        </UserListContainer>
      )}
    </Container>
  );
};

export default SearchPage;
