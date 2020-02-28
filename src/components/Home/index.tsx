import React from 'react';
import { Link } from 'react-router-dom';
import { PageGrid } from '../shared/PageGrid';
import { MainContent, Header, Footer } from '../shared/PageSlots';
import { Radar } from '../Radar';


export const Home: React.FC = () => (
  <PageGrid>
    <Header ms={2} data-testid="home-title">
      <p>HOME PAGE</p>
    </Header>
    <MainContent>
      <Radar />
      <p>
        This is for testing purposes, will be replaced with actual content
      </p>
      <Link to="/details/someId">link to technology details with someId</Link>
    </MainContent>
    <Footer>® Frontmen 2020</Footer>
  </PageGrid>
);
