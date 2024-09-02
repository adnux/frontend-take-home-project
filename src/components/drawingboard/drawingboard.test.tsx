import { render, screen } from '@testing-library/react';
import DrawingBoard from './drawingboard';

describe('DrawingBoard', () => {
  it('renders without crashing', () => {
    render(<DrawingBoard />);
    expect(screen.getByTestId('drawing-board')).toBeDefined();
  });
});
