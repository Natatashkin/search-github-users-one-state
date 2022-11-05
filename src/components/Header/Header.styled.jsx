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

export { HeaderContainer, TitleContainer };
