import React from 'react';
import { Link } from 'react-router-dom';
import { PageGrid } from '../shared/PageGrid';
import { MainContentSlot, FooterSlot } from '../shared/PageSlots';
import { Header } from '../Header';

export const Home: React.FC = () => (
  <MainContentSlot>
    <p>This is for testing purposes, will be replaced with actual content</p>
    <Link to="/details/someId">link to technology details with someId</Link>
  </MainContentSlot>
);
