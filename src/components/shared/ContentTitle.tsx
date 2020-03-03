import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';

export const ContentTitle = styled.h2`
  ${Typography.header};
  font-size: ${props => props.theme.fontSize[1]}em;
  text-transform: capitalize;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]}em;
    margin-top: 0;
  }
`;
