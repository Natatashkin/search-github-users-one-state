import styled from "styled-components";

const MainContainer = styled.div`
  height: calc(100vh - var(--header-height));
  padding: 20px;
  overflow: hidden;
`;

export { MainContainer };

/* --container-height: calc(100vh - var(--header-height));  */

/* height: ${({ isUserPage }) =>
    isUserPage ? "100%" : `var(--container-height)`};  */
