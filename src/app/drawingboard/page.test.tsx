import { render, screen } from '@testing-library/react';
import DrawingBoardPage from './page';

describe('DrawingBoardPage', () => {
  it('renders without crashing', () => {
    render(<DrawingBoardPage />);
    expect(screen.getByRole('main')).toBeDefined();
  });
});