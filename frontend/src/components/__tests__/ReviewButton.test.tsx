import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewButton, ReviewMode } from '../ReviewButton';
import '@testing-library/jest-dom';

describe('ReviewButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Smoke test
  it('renders without crashing', () => {
    render(
      <ReviewButton
        mode="improve"
        onClick={mockOnClick}
        isLoading={false}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Unit test
  it('handles all modes correctly', () => {
    const modes: ReviewMode[] = ['improve', 'faster', 'shorter'];

    modes.forEach(mode => {
      const { rerender } = render(
        <ReviewButton
          mode={mode}
          onClick={mockOnClick}
          isLoading={false}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith(mode);
      expect(button).toHaveClass(`button-${mode}`);

      // Test loading state
      rerender(
        <ReviewButton
          mode={mode}
          onClick={mockOnClick}
          isLoading={true}
        />
      );

      expect(button).toBeDisabled();
    });
  });

  it('shows correct text based on loading state', () => {
    const { rerender } = render(
      <ReviewButton
        mode="improve"
        onClick={mockOnClick}
        isLoading={false}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Improve Code');

    rerender(
      <ReviewButton
        mode="improve"
        onClick={mockOnClick}
        isLoading={true}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Improving...');
  });
});