import styled from "styled-components";

const TitleContainer = styled.div``;

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
`;

const TextFieldContainer = styled.div`
  position: ${({ titleVisibility }) =>
    titleVisibility ? "static" : "absolute"};
  left: ${({ titleVisibility }) => (titleVisibility ? "0" : "50%")};
  transform: ${({ titleVisibility }) =>
    titleVisibility ? "translateX(0)" : "translateX(-50%)"};
  display: flex;
  width: ${({ titleVisibility }) => (titleVisibility ? "100%" : "40%")};
  flex-wrap: nowrap;
`;

const FavButtonContainer = styled.div`
  width: 40px;
  height: 40px;
`;

export {
  HeaderContainer,
  TitleContainer,
  FavButtonContainer,
  TextFieldContainer,
};
