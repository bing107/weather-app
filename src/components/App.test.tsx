import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app container', () => {
  it('should render the app correctly', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('main-svg')).toBeInTheDocument();
    expect(getByTestId('carousel')).toBeInTheDocument();
  });
});
