import styled from "styled-components";

const AvatarContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export { AvatarContainer };
