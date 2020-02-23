import React from 'react';
import { Link } from 'react-router-dom';
import { PageGrid } from '../shared/PageGrid';
import { MainContent, Header, Footer } from '../shared/PageSlots';

export const Home: React.FC = () => (
  <PageGrid>
    <Header ms={2}>
      <p>HOME PAGE</p>
    </Header>
    <MainContent data-testid="home">
      <p>This is for testing purposes, will be replaced with actual content</p>
      <Link to="/details/someId">link to technology details with someId</Link>
    </MainContent>
    <Footer>® Frontmen 2020</Footer>
  </PageGrid>
);
