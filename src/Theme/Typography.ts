import { css } from 'styled-components/macro';

export const Typography = {
  body: css`
    font-family: ${props => props.theme.fonts.body};
    font-size: ${props => props.theme.fontSize[0]}em;
    font-weight: 400;
    line-height: ${props => props.theme.lineHeight[0]};
  `,
  header: css`
    font-family: ${props => props.theme.fonts.primary};
    font-weight: 700;
    line-height: ${props => props.theme.lineHeight[1]};
  `,
};
