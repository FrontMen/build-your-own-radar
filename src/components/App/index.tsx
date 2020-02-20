import React from 'react';
import { Router } from '../../Router';

export const App: React.FC = () => (
  <div className="App">
    <Router data-testid="router" />
  </div>
);
