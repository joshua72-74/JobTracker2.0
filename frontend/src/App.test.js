import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders welcome message in app header', () => {
  render(<App />);
  const header = screen.getByTestId('app-header');
  expect(header).toHaveTextContent(/welcome to jobtracker/i);
});
