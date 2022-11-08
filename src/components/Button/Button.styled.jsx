import styled from "styled-components";

export const TextButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme: { colors } }) => colors.black};
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: 500;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

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
`;
