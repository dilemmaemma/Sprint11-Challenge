import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders spinner when "on" prop is true', () => {
  const { getByTestId, queryByText } = render(<Spinner on={true} />);
  const spinner = getByTestId('spinner');
  const loadingText = queryByText(/Please wait/i);

  expect(spinner).toBeInTheDocument();
  expect(loadingText).toBeInTheDocument();
});

test('does not render spinner when "on" prop is false', () => {
  const { queryByTestId, queryByText } = render(<Spinner on={false} />);
  const spinner = queryByTestId('spinner');
  const loadingText = queryByText(/Please wait/i);

  expect(spinner).not.toBeInTheDocument();
  expect(loadingText).not.toBeInTheDocument();
});