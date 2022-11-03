import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  useSearchParams,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UsersList, UsersListItem, Container } from "../../components";
import debounce from "lodash.debounce";
import * as ghApi from "../../api/ghApi";
import styled from "styled-components";

const PageContainer = styled.div`
  margin: 0 "auto";
  height: ${({ height }) => (height ? `${height}px` : "auto")};
`;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  function updateSize() {
    setSize([window.innerWidth, window.innerHeight]);
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const SearchPage = ({ getCurrentUser }) => {
  const [width, height] = useWindowSize();

  const location = useLocation();
  const { searchQuery: query } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [page] = useState(1);
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
  console.log(height);

  const containerHeight = useMemo(() => {
    const blockHeight = height - 60;
    return blockHeight;
  }, [height]);

  return (
    <PageContainer height={containerHeight}>
      <Container>
        {loading && <h3>Loading...</h3>}
        {userList && searchQuery && (
          <UsersList>
            {userList.map((item) => (
              <UsersListItem key={item.id} item={item} location={location} />
            ))}
          </UsersList>
        )}
      </Container>
    </PageContainer>
  );
};

export default SearchPage;
