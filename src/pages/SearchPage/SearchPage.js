import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { UsersList, UsersListItem } from '../../components';
import debounce from 'lodash.debounce';
import * as ghApi from '../../api/ghApi';

const SearchPage = ({ query, getCurrentUser }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [page] = useState(1);
  const [loading, setIsLoading] = useState(false);

  const removeSearchParams = useCallback(() => {
    searchParams.delete('q');
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

  const debounceRequest = useCallback(
    () => debounce(makeSearchQuery, 500),
    [makeSearchQuery]
  );

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setSearchParams({ q: searchQuery });
      debounceRequest(searchQuery, page);
      return;
    }
    // ghApi.controller.abort();
    removeSearchParams();
    setUserList([]);
  }, [searchQuery, page, debounceRequest, removeSearchParams, setSearchParams]);

  return (
    <div>
      {loading && <h3>Loading...</h3>}
      {userList && searchQuery && (
        <UsersList>
          {userList.map(item => (
            <UsersListItem key={item.id} item={item} location={location} />
          ))}
        </UsersList>
      )}
    </div>
  );
};

export default SearchPage;
