import styled from 'styled-components';
import { MediaQueries } from 'Theme/Helpers';

type WithOpened = { opened: boolean };

export const Container = styled.div`
  align-self: center;
  position: relative;
  cursor: pointer;
  padding: ${props => props.theme.space[2]}px;
  @media (${MediaQueries.desktop}) {
    margin-left: 0.5em;
  }
  margin-bottom: 20px;
`;

export const Selected = styled.div`
  user-select: none;
  padding: ${props => props.theme.space[2]}px 0;
  padding-left: ${props => props.theme.space[2]}px;
  border-bottom: 2px solid ${props => props.theme.pallet.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DropDown = styled.ul<WithOpened>`
  list-style: none;
  width: 100%;
  position: absolute;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.075), 0 8px 8px 0 rgba(0, 0, 0, 0.025);
  padding: ${props => props.theme.space[1]}px 0 0;
  background-color: ${props => props.theme.colors.blocks};
  z-index: 1;
  margin: 0;
`;

export const Option = styled.li<{ selected: boolean }>`
  display: block;
  background-color: ${props =>
    props.selected ? props.theme.pallet.primary : props.theme.pallet.white};
  padding: 0.5em 0 0.5em ${props => props.theme.space[2]}px;
  color: ${props => (props.selected ? props.theme.pallet.white : 'inherit')};
  border-top: 1px solid ${props => props.theme.pallet.light};
  &:hover {
    background-color: ${props =>
      props.selected ? props.theme.pallet.primary : '#526de41a'};
  }
`;

export const Triangle = styled.svg<WithOpened>`
  fill: ${props => props.theme.pallet.secondary};
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transform: scale(
    ${props => (props.opened ? -1 : 1)}
  ); // this reverts triangle
`;

export const Text = styled.span`
  margin-right: ${props => props.theme.space[2]}px;
`;
