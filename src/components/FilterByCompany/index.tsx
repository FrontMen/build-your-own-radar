import React, { useContext } from 'react';
import {  CheckBox } from 'src/components/shared/CheckBox';
import styled from 'styled-components';
import { filterByCompanyContext } from 'src/ContextProviders/FilterByCompanyContextProvider';

const COMPANY_NAMES: {
  [K in CompanyTypes]: string;
} = {
  ITR_BE: 'Intracto BE',
  ITR_NL: 'Intracto NL',
  FM: 'Frontmen',
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${props => props.theme.space[2]}px 0;
`;

export const FilterByCompany = () => {
  const { state, toggle } = useContext(filterByCompanyContext);
  return (
    <Container>
      {Object.entries(state).map(([company, checked]) => (
        <CheckBox
          key={company}
          label={COMPANY_NAMES[company as CompanyTypes]}
          checked={checked}
          onClick={() => toggle(company as CompanyTypes)}
        />
      ))}
    </Container>
  );
};
