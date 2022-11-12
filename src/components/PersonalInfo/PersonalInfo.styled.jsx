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

const SubscriptionsContainer = styled.div`
  margin-top: 15px;
`;

const BioContainer = styled.div`
  margin-top: 15px;
`;

const ContactsContainer = styled.div`
  margin-top: 15px;
`;

export {
  PersonalInfoContainer,
  SubscriptionsContainer,
  BioContainer,
  ContactsContainer,
};
