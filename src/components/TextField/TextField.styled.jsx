import styled from "styled-components";

const Label = styled.label`
  display: inline-block;
  font-size: 16px;
  margin-bottom: 16px;
`;

const Input = styled.input``;

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 40px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.3) inset;
  border-radius: 4px;

  & ${Input} {
    width: 100%;
    height: 100%;
    border: none;
    outline: ${({ name }) => {
      const isSearch = name === "search";
      return isSearch ? "none" : `1px solid black`;
    }};
    border-radius: 4px;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: transparent;
  }
`;

const Adornment = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  pointer-events: none;
`;

export { Label, Input, InputWrapper, Adornment };
