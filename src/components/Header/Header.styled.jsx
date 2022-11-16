import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const showTitle = keyframes`
from {
  width: 0;
  visibility: hidden;
  padding-right: 0;
  opacity: 0;
}
to {
  width: 100%;
 visibility: visible;
 opacity: 1;
}
`;

const hideTitle = keyframes`
from {
  width: 100%;
  padding-right: 8px;
   visibility: visible;
    opacity: 1;
}
to {
  width: 0;
  visibility: hidden;
  opacity: 0;
}
`;

const TitleContainer = styled.div``;
const TextFieldContainer = styled.div``;

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: ${({ isSearchPage }) =>
    isSearchPage ? "0.5fr 7.5fr" : "1fr "};
  grid-template-rows: var(--header-height);
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    grid-template-columns: ${({ isSearchPage }) =>
      isSearchPage ? "1fr 1.5fr 1fr" : "1fr "};
  }

  & ${TitleContainer} {
    visibility: ${({ isSearchPage }) => (isSearchPage ? "hidden" : "visible")};
    padding-right: ${({ isSearchPage }) => (isSearchPage ? "0" : "8px")};
    width: ${({ isSearchPage }) => (isSearchPage ? "0" : "100%")};
    animation-name: ${({ isSearchPage }) => isSearchPage && hideTitle};
    animation-duration: 250ms;
    animation-timing-function: ease-in;

    @media (min-width: 768px) {
      visibility: visible;
      width: 100%;
      padding-right: 8px;
      animation-name: ${({ isSearchPage }) => isSearchPage && showTitle};
      animation-duration: 250ms;
      animation-timing-function: ease-in;
    }
  }

  & ${TextFieldContainer} {
    display: flex;
  }
`;

const LogoAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  z-index: 2;
`;

const FavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  color: ${({ theme: { colors } }) => colors.lightgrey};

  &:hover {
    color: ${({ theme: { colors } }) => colors.yellow};
  }
`;

export {
  HeaderContainer,
  LogoAndTitleContainer,
  TitleContainer,
  FavLink,
  TextFieldContainer,
  LogoContainer,
};
