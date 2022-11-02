import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  font-size: 16px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.3) inset;
  border-radius: 4px;
  padding: 0 10px;
  box-sizing: border-box;
`;

export { Label, Input };
