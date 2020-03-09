import React from 'react';
import { fireEvent } from '@testing-library/dom';

import { CheckBox } from '../CheckBox';
import { withAllProviders } from 'test/helpers';

const defaultProps = {
  checked: false,
  label: 'testCheckbox',
  onClick: jest.fn(),
};

describe('CheckBox', () => {
  it('should matches the snapshot when unchecked', () => {
    const { container } = withAllProviders(<CheckBox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should matches the snapshot when checked', () => {
    const { container } = withAllProviders(
      <CheckBox {...defaultProps} checked={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onClick callback when clicked', () => {
    const { getByTestId } = withAllProviders(<CheckBox {...defaultProps} />);

    fireEvent.click(getByTestId('checkbox'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
