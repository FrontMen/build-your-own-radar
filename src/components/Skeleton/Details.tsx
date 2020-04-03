import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import { lightTheme } from 'Theme';

const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.pallet.white};
  display: flex;
  justify-content: center;
`;

export const DetailsSkeleton = () => (
  <Container>
    <ContentLoader
      speed={1.5}
      width={850}
      viewBox="0 0 850 1000"
      foregroundColor={lightTheme.pallet.white}
      backgroundColor={lightTheme.pallet.light}
      data-testid="details-skeleton"
    >
      <rect x="0" y="57" rx="4" ry="4" width="180" height="20" />
      <rect x="200" y="120" rx="4" ry="4" width="500" height="20" />

      <rect x="230" y="200" rx="4" ry="4" width="10" height="300" />
      <circle cx="235" cy="285" r="12" />
      <circle cx="235" cy="410" r="12" />
      <rect x="150" y="280" rx="4" ry="4" width="60" height="12" />
      <rect x="150" y="405" rx="4" ry="4" width="60" height="12" />

      <rect x="280" y="250" rx="4" ry="4" width="400" height="15" />
      <rect x="280" y="280" rx="4" ry="4" width="280" height="15" />
      <rect x="280" y="310" rx="4" ry="4" width="400" height="15" />

      <rect x="280" y="375" rx="4" ry="4" width="290" height="15" />
      <rect x="280" y="405" rx="4" ry="4" width="270" height="15" />
      <rect x="280" y="435" rx="4" ry="4" width="390" height="15" />

    </ContentLoader>
  </Container>
);

