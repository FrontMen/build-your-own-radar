import React, { useMemo, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import Groupby from 'lodash.groupby';

import {
  Container,
  SearchIcon,
  Input,
  DropDownContainer,
  InputContainer,
  RingName,
  Technology,
} from './styled';
import { d3Config } from 'src/utils/d3-config';
import { GoogleSheetsContext } from 'src/ContextProviders/GoogleSheetsContextProvider';

const options = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'description', weight: 0.3 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
};

export interface SearchProps {
  setHighlighted: (a: string | null) => void;
}

export interface fuseResult {
  item: Technology;
}

export const Search: React.FC<SearchProps> = ({ setHighlighted }) => {
  const { data: technologies } = useContext(GoogleSheetsContext);
  const { quadrant: quadrantParam } = useParams<QuadParamType>();

  const quadrantNum: number = d3Config.quadrants.findIndex(
    (item: { route: string }) => item.route === quadrantParam,
  );

  const [value, setValue] = useState<string>('');

  const data = useMemo(() => {
    if (value.length < 2) return [];

    const fuse = new Fuse(technologies, options);
    // @ts-ignore
    const results: fuseResult[] = fuse.search(value);
    return Groupby(
      results.map(tech => tech.item),
      'ring',
    );
  }, [value, technologies]);
  const dataEntries = Object.entries(data);

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
      {dataEntries.length > 0 && (
        <DropDownContainer data-testid="search-content">
          {dataEntries.map(([ringName, techArray]) => (
            <React.Fragment key={ringName}>
              <RingName data-testid="search-ringName">{ringName}</RingName>
              <div>
                {// @ts-ignore
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
          ))}
        </DropDownContainer>
      )}
    </Container>
  );
};
