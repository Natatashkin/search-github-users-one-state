import styled from "styled-components";

const BioContainer = styled.div`
  width: 99%;
  padding: 10px;
  background-color: ${({ theme: { colors } }) => colors.grey};
  border-radius: 4px;
`;

const Bio = styled.p`
  color: ${({ theme: { colors } }) => colors.white};
`;

export { Bio, BioContainer };
