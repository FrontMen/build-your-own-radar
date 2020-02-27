import React from 'react';
import { Link } from 'react-router-dom';
import { MainContentSlot } from '../shared/PageSlots';

export const Home: React.FC = () => (
  <MainContentSlot>
    <p>This is for testing purposes, will be replaced with actual content</p>
    <Link to="/details/someId">link to technology details with someId</Link>
  </MainContentSlot>
);
