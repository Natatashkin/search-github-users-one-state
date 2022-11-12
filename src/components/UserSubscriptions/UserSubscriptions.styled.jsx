import styled from "styled-components";

export const Subscriptions = styled.div`
  display: flex;

  & svg:first-child {
    margin-right: 4px;
  }

  & svg:nth-child(n + 1) {
    margin-right: 4px;
    margin-left: 4px;
  }

  & div span:first-child {
    margin-right: 4px;
    font-weight: 600;
  }
`;
