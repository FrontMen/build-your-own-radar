import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { MediaQueries } from 'src/Theme/Helpers';
import { Typography } from 'src/Theme/Typography';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: 18em;
  position: relative;
  padding: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.tablet} {
    margin-left: 2em;
  }
`;

export const SearchIcon = styled(IoIosSearch)`
  flex: 0 0 2em;
  height: 2em;
  width: 2em;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid;
  border-color: ${props => props.theme.pallet.secondary};
  flex: 1;
  ${Typography.body};
  outline: none;

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
  border-top: 1px solid #f1f1f1;
  padding-top: 10px;
  margin-top: 5px;
  &:first-of-type {
    border-top: none;
  }
`;

export const Technology = styled(Link)`
  ${Typography.body};
  text-decoration: none;
  display: block;
  color: ${props => props.theme.colors.body};

  &:hover,
  &:focus {
    color: ${props => props.theme.pallet.white};
    background-color: ${props => props.theme.pallet.primary};
  }
`;
