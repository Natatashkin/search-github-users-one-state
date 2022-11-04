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
  overflow: auto;
`;

const SearchPage = ({ getCurrentUser }) => {
  const listHeightRef = useRef(null);
  const listContainerHeight = useRef(null);
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
    setUserList([]);
    try {
      setIsLoading(true);
      const users = await ghApi.searchUsers(data, page);
      setUserList(users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debounceRequest = useCallback(debounce(makeSearchQuery, 500));

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setSearchParams({ q: searchQuery });
      debounceRequest(searchQuery, page);
      return;
    }
    removeSearchParams();
    setUserList([]);
  }, [searchQuery, page]);

  const handleScroll = (e) => {
    // console.dir(e.target);
    // console.log("e.target.scrollHeight", e.target.scrollHeight);
    // console.log("e.target.scrollTop", e.target.scrollTop);
    // console.log("e.target.clientHeight", e.target.clientHeight);
    // console.log(loading);

    const shouldUpdate =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (loading && shouldUpdate) return;

    console.log(shouldUpdate);
    if (shouldUpdate) {
      setPage((prevPage) => {
        console.log(prevPage);
        return prevPage + 1;
      });
    }
  };

  return (
    <Container>
      {loading && <h3>Loading...</h3>}
      {userList && searchQuery && (
        <UserListContainer onScroll={handleScroll}>
          <UsersList ref={listHeightRef}>
            {userList.map((item) => (
              <UsersListItem key={item.id} item={item} location={location} />
            ))}
          </UsersList>
        </UserListContainer>
      )}
    </Container>
  );
};

export default SearchPage;
