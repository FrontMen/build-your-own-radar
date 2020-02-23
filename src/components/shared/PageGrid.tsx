import styled from 'styled-components';

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1024px 1fr;
  grid-template-areas: '. header .' '. main .' '. footer .';
`;

