import React, { useMemo, useState, useEffect, useRef } from 'react';
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
import { d3Config } from 'utils/d3-config';
import { useSelector } from 'react-redux';
import { selectedTechnologyDataSetSelector } from 'redux/selectors/technologies';

const options = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'description', weight: 0.3 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
};

export interface SearchProps {
  setSelected: (a: string | null) => void;
}

export const Search: React.FC<SearchProps> = ({ setSelected }) => {
  const technologies = useSelector(selectedTechnologyDataSetSelector());
  const containerRef: any = useRef();
  const [value, setValue] = useState<string>('');

  const data = useMemo(() => {
    if (value.length < 2) return [];

    const fuse = new Fuse(technologies, options);
    const results = fuse.search(value);
    return Groupby(
      results.map(tech => tech.item),
      'ring',
    );
  }, [value, technologies]);
  const dataEntries = Object.entries(data);

  useEffect(() => {
    const clickHandler = (e: any) => {
      if (!containerRef.current?.contains(e.target)) setValue('');
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  return (
    <Container data-testid="subnav-search-container" ref={containerRef}>
      <SearchIcon data-testid="search-icon" />
      <InputContainer>
        <Input
          data-testid="search-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={'Search...'}
          type="search"
        />
      </InputContainer>

      {dataEntries.length > 0 && (
        <DropDownContainer data-testid="search-content">
          {dataEntries.map(([ringName, techArray]) => (
            <React.Fragment key={ringName}>
              <RingName data-testid="search-ringName">{ringName}</RingName>
              <div>
                {techArray.map(technology => (
                  <Technology
                    data-testid="search-technology"
                    key={technology.name}
                    onClick={e => {
                      e.preventDefault();
                      const baseLink = `/${
                        d3Config.quadrants[technology.quadrant].route
                      }`;
                      setValue('');
                      setSelected(`${baseLink}?tech=${technology.positionId}`);
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
