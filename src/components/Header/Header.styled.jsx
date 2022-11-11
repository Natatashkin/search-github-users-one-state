import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const TitleContainer = styled.div``;
const TextFieldContainer = styled.div``;

const HeaderContainer = styled.header`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  height: var(--header-height);

  & ${TitleContainer} {
    display: ${({ titleVisibility }) => (titleVisibility ? "none" : "block")};
  }

  & ${TextFieldContainer} {
    position: ${({ titleVisibility }) =>
      titleVisibility ? "static" : "absolute"};
    left: ${({ titleVisibility }) => (titleVisibility ? "0" : "50%")};
    transform: ${({ titleVisibility }) =>
      titleVisibility ? "translateX(0)" : "translateX(-50%)"};
    display: flex;
    width: ${({ titleVisibility }) => (titleVisibility ? "100%" : "40%")};
    flex-wrap: nowrap;
  }
`;

const FavLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: -8px;
  color: ${({ theme: { colors } }) => colors.lightgrey};

  &:hover {
    color: ${({ theme: { colors } }) => colors.yellow};
  }
`;

export { HeaderContainer, TitleContainer, FavLink, TextFieldContainer };
