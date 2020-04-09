import styled from 'styled-components/macro';
import { IoIosSearch } from 'react-icons/io';
import { Typography } from 'Theme/Typography';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  padding: ${props => props.theme.space[2]}px 0;
  margin-bottom: 20px;
`;

export const SearchIcon = styled(IoIosSearch)`
  flex: 0 0 1.5em;
  height: 2em;
  width: 2em;
  margin: 5px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid;
  border-color: ${props => props.theme.pallet.secondary};
  flex: 1;
  ${Typography.body};
  outline: none;
  -webkit-appearance: none;

  &:focus {
    border-color: ${props => props.theme.pallet.primary};
  }
`;

export const DropDownContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.075), 0 8px 8px 0 rgba(0, 0, 0, 0.025);
  padding: ${props => props.theme.space[2]}px;
  background-color: ${props => props.theme.colors.blocks};
  position: absolute;
  top: 60px;
  max-height: 500px;
  overflow: auto;
  z-index: 1;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

export const RingName = styled.div`
  margin-bottom: ${props => props.theme.space[2]}px;
  font-size: 1.25em;
  font-weight: 600;
  min-width: 12rem;
  border-top: 1px solid ${props => props.theme.pallet.light};
  padding-top: 10px;
  margin-top: 5px;
  &:first-of-type {
    border-top: none;
  }
`;

export const Technology = styled.a`
  ${Typography.body};
  text-decoration: none;
  display: block;
  color: ${props => props.theme.colors.body};
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${props => props.theme.pallet.white};
    background-color: ${props => props.theme.pallet.primary};
  }
`;
