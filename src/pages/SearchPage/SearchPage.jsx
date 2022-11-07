import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  useSearchParams,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import {
  UsersList,
  UsersListItem,
  Container,
  Spinner,
  Button,
} from "../../components";
import * as ghApi from "../../api/ghApi";
import styled from "styled-components";

const UserListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
`;

const ListOptions = styled.div`
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
  const listRef = useRef(null);
  const showSpinner = loading && page < 2;
  const showError = error && !loading;
  const showUserList = userList && searchQuery;
  const showListSpinner = loading && page > 1;

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

  const debouncedRequest = useDebouncedCallback(makeSearchQuery, 350);

  const resetSearchState = () => {
    setUserList([]);
    setTotalPages(0);
    setPage(1);
    setShowButton(false);
  };

  useEffect(() => {
    setSearchQuery(query);
    resetSearchState();
  }, [query]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setSearchParams({ q: searchQuery });

      if (totalPages > 0 && totalPages < page) {
        setShowButton(true);
        return;
      }
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

    if (shouldUpdate) {
      setPage((prevPage) => {
        return prevPage + 1;
      });
    }
  };

  const handleScrollToTop = (e) => {
    listRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      {showSpinner && <Spinner />}
      {showError && <h3>{error}</h3>}
      {showUserList && (
        <UserListContainer ref={listRef} onScroll={handleScroll}>
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
          <ListOptions>
            {showListSpinner && <Spinner size={7} />}
            {showButton && (
              <Button
                title="Back to top"
                type="button"
                onClick={handleScrollToTop}
              />
            )}
          </ListOptions>
        </UserListContainer>
      )}
    </Container>
  );
};

export default SearchPage;
