import styled from "styled-components";

const Title = styled.h2`
  font-size: 24px;
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  transition-property: font-size;
  transition-duration: 250ms;
  transition-timing-function: ease-in;

  @media (min-width: 768px) {
    font-size: ${({ theme: { typography } }) => typography.h2};
  }
`;

export { Title };
