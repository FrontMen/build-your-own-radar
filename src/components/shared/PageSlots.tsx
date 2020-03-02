import styled from 'styled-components/macro';
import { LightThemeType } from 'src/Theme';

export const MainContentSlot = styled.div`
  grid-area: main;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.light};
  padding: ${({ theme }) => theme.space[3]}px;
`;

export const HeaderSlot = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.light};
  padding: ${({ theme }) => theme.space[3]}px;
  height: 80px;
  margin-bottom: ${({ theme }) => theme.space[3]}px;
`;

export const FooterSlot = styled.div`
  grid-area: footer;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.light};
  padding: ${({ theme }) => theme.space[3]}px;
`;
