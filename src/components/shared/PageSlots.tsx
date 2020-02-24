import styled from 'styled-components';
import { LightThemeType } from '../../Theme';
import { Type } from '../../Theme/Typeography';

export const MainContent = styled.div`
  grid-area: main;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.light};
`;

export const Header = styled.div`
  ${Type.header}
  grid-area: header;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.light};
`;

export const Footer = styled.div`
  grid-area: footer;
  background-color: ${({ theme }: { theme: LightThemeType }) =>
    theme.pallet.light};
`;
