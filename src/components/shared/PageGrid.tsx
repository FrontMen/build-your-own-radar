import styled from 'styled-components/macro';

export const PageGrid = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: ${({ theme }) =>
    `repeat(auto-fit, minmax(auto, ${theme.pageWidth}))`};

  grid-template-rows: auto 1fr 80px;
  grid-template-areas: 'header ' ' main ' ' footer ';
  justify-content: center;
`;
