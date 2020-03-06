import styled from 'styled-components/macro';
import { LightThemeType } from 'src/Theme';
import { MediaQueries } from 'src/Theme/Helpers';

export const HeaderSlot = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.white};
  padding: ${({ theme }) => `${theme.space[0]}px ${theme.space[2]}px`};

  @media ${MediaQueries.phablet} {
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[4]}px`};
  }
`;

export const MainContentSlot = styled.div`
  grid-area: main;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.colors.blocks};
  padding: ${({ theme }) => theme.space[3]}px;

  @media ${MediaQueries.phablet} {
    padding: ${({ theme }) => theme.space[4]}px;
  }
`;

export const FooterSlot = styled.div`
  grid-area: footer;
  flex-wrap: wrap;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.colors.blocks};
  padding: ${({ theme }) => theme.space[3]}px;

  @media ${MediaQueries.phablet} {
    padding: ${({ theme }) => theme.space[4]}px;
  }
`;
