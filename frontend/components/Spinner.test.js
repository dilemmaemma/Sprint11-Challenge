import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders spinner when "on" prop is true', () => {
  const { queryByText } = render(<Spinner on={true} />);
  const loadingText = queryByText(/Please wait/i);

  expect(loadingText).toBeInTheDocument();
});

test('does not render spinner when "on" prop is false', () => {
  const { queryByText } = render(<Spinner on={false} />);
  const loadingText = queryByText(/Please wait/i);

  expect(loadingText).not.toBeInTheDocument();
});