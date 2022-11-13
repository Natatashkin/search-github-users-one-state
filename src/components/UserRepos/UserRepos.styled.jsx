import styled, { keyframes } from "styled-components";

const slide = keyframes`
   from {     
     transform: translateY(-110%);  
    }
   to {   
     transform: translateY(0%);
  }
 `;

const ReposContainer = styled.div`
  width: 100%;
`;

const DropHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99%;
  padding: 2px 0px 2px 8px;
  border-radius: 4px;
  background-color: ${({ theme: { colors } }) => colors.white};
  box-shadow: ${({ theme: { shadow } }) => shadow.outerShadow};
  margin-bottom: 15px;
  & span {
    font-weight: 700;
  }
`;

const DropButtonContainer = styled.div`
  border-radius: 4px;
`;

const ListContainer = styled.div`
  overflow-y: hidden;
  overflow-x: visible;
`;

const ReposList = styled.ul`
  width: 99%;
  background-color: transparent;
  list-style: none;
  animation: ${slide} 2500ms linear;
`;

const RepoListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 4px;
  box-shadow: ${({ theme: { shadow } }) => shadow.outerShadow};

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  & h4 {
    margin-bottom: 10px;
  }

  & p {
    color: ${({ theme: { colors } }) => colors.grey};
  }
`;

export {
  ReposContainer,
  DropHeader,
  DropButtonContainer,
  ReposList,
  RepoListItem,
  ListContainer,
};
