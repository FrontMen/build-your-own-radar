import React from 'react';
import { FooterSlot } from '../shared/PageSlots';
import { Logo } from '../Header/Logo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Slot = styled(FooterSlot)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = () => {
  return (
    <Slot>
      <div>
        <Link to={'/'}>Home</Link>
      </div>

      <i>
        {'A collaboration between '}
        <a href={'https://www.frontmen.nl/'}>Frontmen</a>
        {' and '}
        <a href={'https://www.intracto.com/'}>Intracto</a>.
      </i>
    </Slot>
  );
};
