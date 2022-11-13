import styled from "styled-components";

const PersonalInfoContainer = styled.div`
  margin-top: 15px;
  & h3 {
    font-size: ${({ theme: { typography } }) => typography.h3};
    font-weight: 700;
  }

  & h4 {
    font-size: 500;
    & a {
      text-decoration: none;
      color: ${({ theme: { colors } }) => colors.lightgrey};
    }
  }
`;
const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubscriptionsContainer = styled.div`
  margin-top: 15px;
`;

const BioContainer = styled.div`
  margin-top: 15px;
`;

const ContactsContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export {
  PersonalInfoContainer,
  SubscriptionsContainer,
  BioContainer,
  ContactsContainer,
  NameContainer,
};
