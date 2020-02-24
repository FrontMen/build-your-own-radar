import { css } from 'styled-components';

const getModularScale = (num: number, ratio: number) => Math.pow(num, ratio);

interface msTypes {
  readonly ms: number;
}

export const Type = {
  body: css`
    font-size: ${({ theme }) => getModularScale(1, theme.ModularScale.ratio)}em;
    font-weight: 400;
    line-height: ${({ theme }) => theme.ModularScale.lineHeight[0]};
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
  header: css<msTypes>`
    font-size: ${({ ms, theme }) =>
      getModularScale(ms, theme.ModularScale.ratio)}em;
    font-weight: 400;
    line-height: ${({ theme }) => theme.ModularScale.lineHeight[1]};
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
};
