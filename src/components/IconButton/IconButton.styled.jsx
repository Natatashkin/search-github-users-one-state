import styled, { keyframes } from "styled-components";

// const activeColor = keyframes`
// from {
// color : ${({ theme: { colors } }) => colors.lightgrey};

// }

// to{
// color: ${({ theme: { colors } }) => colors.yellow};
// }
// `;

// const normalColor = keyframes`
// from {
// color : ${({ theme: { colors } }) => colors.yellow};

// }

// to{
// color: ${({ theme: { colors } }) => colors.lightgrey};
// }
// `;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 8px;
  border: none;
  background-color: ${({ theme: { colors } }) => colors.white};
`;

export { Button };
