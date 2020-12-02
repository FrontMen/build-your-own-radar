import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'components/shared/CheckBox';
import styled from 'styled-components';
import { selectedCompaniesSelector } from 'redux/selectors/filters';
import { filtersActions } from 'redux/actions/filters';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${props => props.theme.space[2]}px 0;
  min-width: 100%;
`;

export const FilterByCompany = () => {
  const selectedCompanies = useSelector(selectedCompaniesSelector);
  const dispatch = useDispatch();
  const toggle = useCallback(
    (shortName: string) => {
      dispatch(filtersActions.toggleCompany(shortName));
    },
    [dispatch],
  );

  return (
    <Container data-testid="subnav-filters-container">
      {selectedCompanies.map(({ shortName, name, checked }) => (
        <CheckBox
          dataTestid={shortName}
          key={shortName}
          label={name}
          checked={checked}
          onClick={() => toggle(shortName)}
        />
      ))}
    </Container>
  );
};
