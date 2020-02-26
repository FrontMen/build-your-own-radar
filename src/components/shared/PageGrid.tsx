import styled from 'styled-components/macro';

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) =>
    `repeat(auto-fit, minmax(auto, ${theme.pageWidth}))`};
  grid-template-areas: 'header ' ' main ' ' footer ';
  justify-content: center;
`;
