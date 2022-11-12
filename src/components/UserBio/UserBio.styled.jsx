import styled from "styled-components";

const BioContainer = styled.div`
  padding: 10px;
  background-color: ${({ theme: { colors } }) => colors.white};
`;

const Bio = styled.p`
  color: ${({ theme: { colors } }) => colors.grey};
`;

export { Bio, BioContainer };
