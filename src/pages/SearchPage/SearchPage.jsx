import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  useSearchParams,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UsersList, UsersListItem, Container } from "../../components";
import debounce from "lodash.debounce";
import * as ghApi from "../../api/ghApi";

const SearchPage = ({ getCurrentUser }) => {
  const listHeightRef = useRef(null);
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
    }
    setIsLoading(false);
  }, []);

  const debounceRequest = useCallback(debounce(makeSearchQuery, 500));

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery.length >= 3) {
      setSearchParams({ q: searchQuery });
      debounceRequest(searchQuery, page);
      return;
    }
    removeSearchParams();
    setUserList([]);
  }, [searchQuery, page]);

  const handleScroll = ({ target }) => {
    const shouldLoadMoreUsers =
      target.scrollHeight - target.scrollTop - target.offsetHeight < 50;
    console.log(shouldLoadMoreUsers);

    if (shouldLoadMoreUsers) {
      setPage((prev) => prev + 1);
    }
    // if (target.scrollHeight - target.scrollTo > 50) {

    // }
    // const bottom = listHeight -
  };

  useEffect(() => {
    if (listHeightRef.current) {
      listHeightRef.current.addEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Container>
      {loading && <h3>Loading...</h3>}
      {userList && searchQuery && (
        <UsersList ref={listHeightRef}>
          {userList.map((item) => (
            <UsersListItem key={item.id} item={item} location={location} />
          ))}
        </UsersList>
      )}
    </Container>
  );
};

export default SearchPage;
