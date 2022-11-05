import styled from "styled-components";

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
`;

const TitleContainer = styled.div`
  display: ${({ titleVisibility }) => (titleVisibility ? "none" : "block")};
`;

const InputWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
`;

export { HeaderContainer, TitleContainer, InputWrapper };
