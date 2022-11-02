import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
`;

const InputWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
`;

export { HeaderContainer, InputWrapper };
