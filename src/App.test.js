import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("canvasjs-react-charts", () => {
  return {
    CanvasJSChart: () => (<div> </div>)
  }
});
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Filter and Check Country's Specific data");
  expect(linkElement).toBeInTheDocument();
});
