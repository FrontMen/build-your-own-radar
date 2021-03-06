import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { lightTheme } from 'Theme';
import { Typography } from 'Theme/Typography';

const CheckBoxContainer = styled.span<Pick<CheckBoxProps, 'checked'>>`
  border: 2px solid ${props => props.theme.pallet.primary};
  background-color: ${props =>
    props.theme.pallet[props.checked ? 'primary' : 'white']};
  padding: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 18px;
  height: 18px;
  ${Typography.body};
`;

const Label = styled.label`
  ${Typography.body};
  margin-right: ${props => props.theme.space[3]}px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.space[2]}px;
  align-items: center;
`;

interface CheckBoxProps {
  checked: boolean;
  label: string;
  onClick: () => void;
  dataTestid: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  label,
  onClick,
  dataTestid,
}) => {
  return (
    <Container data-testid={dataTestid}>
      <Label>{label}</Label>
      <CheckBoxContainer
        data-testid="checkbox"
        checked={checked}
        onClick={onClick}
      >
        {checked && <FaCheck color={lightTheme.pallet.white} />}
      </CheckBoxContainer>
    </Container>
  );
};
