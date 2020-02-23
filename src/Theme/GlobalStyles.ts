import { createGlobalStyle } from 'styled-components';
import { LightThemeType } from '.';

export const GlobalStyle = createGlobalStyle<{ theme: LightThemeType }>`
    body {
        font-size: 16px;
        font-family: ${({ theme }) => theme.fonts.body};
        line-height: ${({ theme }) => theme.ModularScale.lineHeight};
        color: ${({ theme }) => theme.colors.body};
        background-color: ${({ theme }) => theme.colors.background};
    }
`;
