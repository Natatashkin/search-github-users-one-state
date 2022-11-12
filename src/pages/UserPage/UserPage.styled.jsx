import styled from "styled-components";
import { Link } from "react-router-dom";

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme: { colors } }) => colors.black};
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: 500;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  text-decoration: none;

  &:hover {
    outline: 1px solid ${({ theme: { colors } }) => colors.black};
    background-color: ${({ theme: { colors } }) => colors.white};
    color: ${({ theme: { colors } }) => colors.black};
  }

  &:active {
    outline: 1px solid ${({ theme: { colors } }) => colors.black};
    background-color: ${({ theme: { colors } }) => colors.white};
    color: ${({ theme: { colors } }) => colors.black};
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5) inset;
  }

  & svg {
    margin-right: 8px;
  }

  & span > span {
    display: none;
    @media (min-width: 768px) {
      display: inline;
    }
  }
`;

const UserContainer = styled.div`
  padding: 20px 0;
`;

const AvatarContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

export { BackLink, UserContainer, AvatarContainer };
