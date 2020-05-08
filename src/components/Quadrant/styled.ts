import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import { MediaQueries } from 'Theme/Helpers';
import { Typography } from 'Theme/Typography';

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

  @media (${MediaQueries.phablet}) {
    width: 50%;
  }
`;

export const Title = styled.h3`
  ${Typography.header};
  font-size: ${props => props.theme.fontSize[0]};
  margin: 0;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media (${MediaQueries.phablet}) {
    font-size: ${props => props.theme.fontSize[1]};
  }
`;

export const List = styled.ul`
  padding-left: 0;
  margin: 0;
`;

export const Dot = styled.span<{ color: string }>`
  color: ${props => props.color};
  padding-right: 4px;
  font-size: 2em;
  vertical-align: sub;
`;

export const Tooltip = styled.span`
  background-color: ${props => props.theme.pallet.grayLight};
  position: relative;
  display: inline-block;
  line-height: 22px;
  width: 22px;
  margin-left: 12px;
  color: ${props => props.theme.pallet.white};
  cursor: pointer;
  text-align: center;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    span {
      visibility: visible;
      opacity: 1;
    }
  }

  span {
    visibility: hidden;
    position: absolute;
    font-size: 14px;
    font-weight: 700;
    width: 270px;
    background: rgba(0, 0, 0, 0.8);
    color: ${props => props.theme.pallet.white};
    border-radius: 6px;
    padding: 10px 15px;
    text-align: left;
    z-index: 1;
    bottom: 130%;
    margin-left: -80px;
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -64px;
      border-width: 5px;
      border-style: solid;
      border-color: ${props => props.theme.pallet.grayDark} transparent
        transparent transparent;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  flex-grow: 1;
`;

export const Article = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${props => props.theme.space[2]}px;
  @media (${MediaQueries.phablet}) {
    padding-right: ${props => props.theme.space[3]}px;
  }

  @media (${MediaQueries.desktop}) {
    max-width: 50%;
  }
`;

export const Description = styled.p`
  ${Typography.body};
  margin: 0 0 ${props => props.theme.space[2]}px;
`;
