import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedDataSetSelector } from 'redux/selectors/filters';
import { filtersActions } from 'redux/actions/filters';
import {
  Container,
  Selected,
  Text,
  Triangle,
  Option,
  DropDown,
} from './styled';

export const DataSetFilter = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const { availableDates, selected } = useSelector(selectedDataSetSelector);
  const dispatch = useDispatch();
  const selectDate = useCallback(
    (date: string) => {
      dispatch(filtersActions.selectDataSet(date));
    },
    [dispatch],
  );
  const toggleOpened = useCallback(() => {
    setOpened(prevOpened => !prevOpened);
  }, [setOpened]);

  return (
    <Container data-testid="dataSetFilter-container">
      <Selected data-testid="dataSetFilter-anchor" onClick={toggleOpened}>
        <Text data-testid="dataSetFilter-text">{selected}</Text>
        <Triangle
          opened={opened}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M7 10l5 5 5-5z" />
        </Triangle>
      </Selected>
      {opened && (
        <DropDown opened={opened} data-testid="dataSetFilter-dropdown">
          {availableDates.map(date => (
            <Option
              key={date}
              data-testid={`dataSetFilter-dropdown-option-${date}`}
              selected={selected === date}
              onClick={() => {
                selectDate(date);
                setOpened(false);
              }}
            >
              {date}
            </Option>
          ))}
        </DropDown>
      )}
    </Container>
  );
};
