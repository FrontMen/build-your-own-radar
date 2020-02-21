import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => (
  <div data-testid="home">
    <p>HOME PAGE</p>
    <p>This is for testing purposes, will be replaced with actual content</p>
    <Link to="/details/someId">link to technology details with someId</Link>
  </div>
);
