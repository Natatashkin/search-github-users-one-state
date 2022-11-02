import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '../Container';
import styled from 'styled-components';

const PageLayout = () => {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default PageLayout;
