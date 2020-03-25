import React from 'react';
import { FooterSlot } from '../shared/PageSlots';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Slot = styled(FooterSlot)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = () => (
  <Slot>
    <div>
      <Link to="/" data-testid="footer-home-link">
        Home
      </Link>
    </div>

    <i>
      {'A collaboration between '}
      <a href="https://www.frontmen.nl/" data-testid="footer-Frontmen-link">
        Frontmen
      </a>
      {' and '}
      <a href="https://www.intracto.com/" data-testid="footer-Intracto-link">
        Intracto
      </a>
      .
    </i>
  </Slot>
);
