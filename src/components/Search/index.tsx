import React, { useMemo, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { IoIosSearch } from 'react-icons/io';
import Fuse from 'fuse.js';
import Groupby from 'lodash.groupby';


import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { d3Config } from 'src/utils/d3-config';
import { GoogleSheetsContext } from 'src/ContextProviders/GoogleSheetsContextProvider';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: 18em;
  position: relative;
  padding: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.tablet} {
    margin-left: 2em;
  }
`;

const SearchIcon = styled(IoIosSearch)`
  flex: 0 0 2em;
  height: 2em;
  width: 2em;
`;

const Input = styled.input`
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

const DropDownContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.075), 0 8px 8px 0 rgba(0, 0, 0, 0.025);
  padding: ${props => props.theme.space[2]}px;
  background-color: ${props => props.theme.colors.blocks};
  position: absolute;
  top: 60px;
  max-height: 500px;
  overflow: scroll;
  z-index: 1;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const RingName = styled.div`
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

const Technology = styled(Link)`
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

const options = {
  keys: [{ name: 'name', weight: 0.7 }, { name: 'description', weight: 0.3 }],
  threshold: 0.3,
  minMatchCharLength: 2,
};

export interface SearchProps {
  setHighlighted: (a: string | null) => void;
}

export interface fuseResult {
  item: Technology,
};

export const Search: React.FC<SearchProps> = ({ setHighlighted }) => {
  const { data: technologies } = useContext(GoogleSheetsContext);
  const { quadrant: quadrantParam } = useParams<QuadParamType>();

  const quadrantNum: number = d3Config.quadrants.findIndex(
    (item: { route: string }) => item.route === quadrantParam,
  );

  const [value, setValue] = useState<string>('');
  const fuse = new Fuse(technologies, options);
  // @ts-ignore
  const results: fuseResult[] = fuse.search(value);
  const data = useMemo(() => {
    if (value.length < 2) return [];
    return Groupby(results.map(tech => tech.item), 'ring')
  }, [value, results])

  return (
    <Container>
      <InputContainer>
        <Input
          data-testid="search-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={'Search...'}
        />
      </InputContainer>
      <SearchIcon data-testid="search-icon" />
      {Object.keys(data).length > 0 && (
        <DropDownContainer data-testid="search-content">
          {
            Object.entries(data).map(([ringName, techArray]) => 
              <React.Fragment key={ringName}>
                <RingName data-testid="search-ringName">{ringName}</RingName>
                <div>
                  {
                    // @ts-ignore
                    techArray.map((technology: any) => (
                    <Technology
                      data-testid="search-technology"
                      key={technology.name}
                      to={`/${d3Config.quadrants[technology.quadrant].route}`}
                      onClick={() => {
                        if (technology.quadrant !== quadrantNum) setValue('');
                        setHighlighted(technology.name);
                      }}
                    >
                      {technology.name}
                    </Technology>
                  ))}
                </div>
              </React.Fragment>
            )
          }
        </DropDownContainer>
      )}
    </Container>
  );
};
