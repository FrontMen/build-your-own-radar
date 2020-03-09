import styled from 'styled-components/macro';
import { MediaQueries } from 'src/Theme/Helpers';

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) =>
    `repeat(auto-fit, minmax(auto, ${theme.pageWidth}))`};

  grid-template-rows: auto 1fr 80px;
  grid-row-gap: ${({ theme }) => theme.space[2]}px;
  grid-template-areas: 'header ' ' main ' ' footer ';
  justify-content: center;

  @media ${MediaQueries.phablet} {
    grid-row-gap: ${({ theme }) => theme.space[3]}px;
  }
`;
