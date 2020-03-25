import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'src/components/shared/CheckBox';
import styled from 'styled-components';
import { COMPANY_NAMES } from './config';
import { selectedCompaniesSelector } from 'src/redux/selectors/filters';
import { filtersActions } from 'src/redux/actions/filters';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${props => props.theme.space[2]}px 0;
`;

export const FilterByCompany = () => {
  const selectedCompanies = useSelector(selectedCompaniesSelector);
  const dispatch = useDispatch();
  const toggle = useCallback(
    (company: CompanyTypes) => {
      dispatch(filtersActions.toggleCompany(company));
    },
    [dispatch],
  );

  return (
    <Container data-testid="subnav-filters-container">
      {Object.entries(selectedCompanies).map(([company, checked]) => (
        <CheckBox
          dataTestid={company}
          key={company}
          label={COMPANY_NAMES[company as CompanyTypes]}
          checked={checked}
          onClick={() => toggle(company as CompanyTypes)}
        />
      ))}
    </Container>
  );
};
