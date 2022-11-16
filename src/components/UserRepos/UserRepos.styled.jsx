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
  margin-top: 15px;
  margin-bottom: 30px;
`;

const DropHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99%;
  height: 38px;
  padding: 0px 0px 0px 8px;
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
  padding: 20px 0;
  scrollbar-width: thin;
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

  & a {
    text-decoration: none;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  & h4 {
    margin-bottom: 10px;
    color: ${({ theme: { colors } }) => colors.black};
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
