import styled from "styled-components";

const UserListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
`;

const ListOptions = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 10px;
  min-height: 40px;
`;

export { UserListContainer, ListOptions };
