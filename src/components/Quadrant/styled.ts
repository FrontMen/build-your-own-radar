import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';
import { Typography } from 'src/Theme/Typography';

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Ring = styled.div`
  min-width: 12rem;
  padding-right: ${props => props.theme.space[3]}px;
  margin-bottom: ${props => props.theme.space[4]}px;
  break-inside: avoid;

  @media ${MediaQueries.phablet} {
    width: 50%;
  }
`;

export const Title = styled.h3`
  ${Typography.header};
  font-size: ${props => props.theme.fontSize[0]};
  margin: 0;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]};
  }
`;

export const List = styled.ul`
  padding-left: 0;
  margin: 0;
`;

export const Dot = styled.span`
  color: #1ebccd;
  padding-right: 4px;
`;

export const Tooltip = styled.span`
  background-color: #bfc0bf;
  position: relative;
  display: inline-block;
  line-height: 22px;
  width: 22px;
  margin-left: 12px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    .tooltip-text {
      visibility: visible;
      opacity: 1;
    } 
  }

  .tooltip-text {
    visibility: hidden;
    position: absolute;
    font-size: 12px;
    font-weight: 700;
    width: 270px;
    background: rgba(0,0,0,.8);
    color: #FFF;
    border-radius: 6px;
    padding: 10px 15px;
    text-align: left;
    z-index: 1;
    bottom: 130%;
    margin-left: -80px;
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -64px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }
`;