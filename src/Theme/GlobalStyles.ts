import { createGlobalStyle } from 'styled-components/macro';
import { LightThemeType } from '.';

export const GlobalStyle = createGlobalStyle<{ theme: LightThemeType }>`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    }

    body {
        font-size: 16px;
        font-family: ${props => props.theme.fonts.body};
        line-height: ${props => props.theme.lineHeight};
        color: ${props => props.theme.colors.body};
        background-color: ${props => props.theme.colors.background};
    }
`;
