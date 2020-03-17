export const dataCy = (value: string) => cy.get(`[data-cy=${value}]`);
export const dataTestId = (value: string) => cy.get(`[data-testid=${value}]`);

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}
