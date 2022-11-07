import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  margin-left: auto;
  margin-right: auto;

  list-style: none;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

export { List };
