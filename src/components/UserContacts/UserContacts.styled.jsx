import styled from "styled-components";

const Contacts = styled.ul`
  list-style: none;
  margin-top: 15px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  & svg {
    margin-right: 4px;
    font-size: 18px;
  }
`;

export { Contacts, Item };
