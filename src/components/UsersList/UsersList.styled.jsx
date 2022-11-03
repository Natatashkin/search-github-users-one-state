import styled from "styled-components";

const List = styled.ul`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  overflow: auto;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

export { List };
