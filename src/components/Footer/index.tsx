import React from 'react';
import { FooterSlot } from '../shared/PageSlots';
import { Logo } from '../Header/Logo';
import styled from 'styled-components';

const Slot = styled(FooterSlot)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = () => {
  return (
    <Slot>
      <i>® Frontmen 2020 </i>
      <Logo />
    </Slot>
  );
};
