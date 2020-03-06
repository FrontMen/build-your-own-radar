import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { IoIosSearch } from 'react-icons/io';

import { useAppState } from 'src/hooks/useAppState';
import { Typography } from 'src/Theme/Typography';

const Container = styled.div`
  display: flex;
  padding: ${props => props.theme.space[2]}px;
`;

const SearchIcon = styled(IoIosSearch)`
  height: 3em;
  flex: 0 0 3em;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${props => props.theme.pallet.primary};
  flex: 1;
  ${Typography.body};
  padding-top: 15px;
  outline: none;
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
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  padding-left: 10px;
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
`;

export interface SearchProps {
  setHighlighted: (a: string | null) => void;
}

export const Search: React.FC<SearchProps> = ({ setHighlighted }) => {
  const {
    state: { technologies },
  } = useAppState();
  const { quadrant } = useParams<QuadParamType>();
  const [value, setValue] = useState<string>('');
  const data = useMemo(
    () =>
      !value.length
        ? []
        : technologies
            .filter(t => t.name.toLocaleLowerCase().includes(value))
            .reduce(
              (acc, tech) => {
                const ringName = tech.ring;
                if (acc[ringName]) {
                  acc[ringName].push(tech);
                } else {
                  acc[ringName] = [tech];
                }
                return acc;
              },
              {} as {
                [key: string]: Technology[];
              },
            ),
    [value, technologies],
  );

  return (
    <Container>
      <SearchIcon data-testid="search-icon" />
      <InputContainer>
        <Input
          data-testid="search-input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {!!Object.keys(data).length && (
          <DropDownContainer data-testid="search-content">
            {Object.entries(data).map(([ringName, techArray]) => (
              <React.Fragment key={ringName}>
                <RingName data-testid="search-ringName">{ringName}</RingName>
                <div>
                  {techArray.map(technology => (
                    <Technology
                      data-testid="search-technology"
                      key={technology.name}
                      to={`/${technology.quadrant}`}
                      onClick={() => {
                        if (technology.quadrant !== quadrant) {
                          setValue('');
                        }
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
      </InputContainer>
    </Container>
  );
};
