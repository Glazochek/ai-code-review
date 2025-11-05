import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { reviewCode } from './services/ApiService';
import '@testing-library/jest-dom';

jest.mock('./services/apiService');
const mockedReviewCode = reviewCode as jest.MockedFunction<typeof reviewCode>;

describe('App Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Smoke test
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('AI Code Review')).toBeInTheDocument();
  });

  // Integration test
  it('completes full review workflow', async () => {
    const testCode = 'function test() { return 1; }';
    const reviewedCode = 'function test() {\n  return 1;\n}';

    mockedReviewCode.mockResolvedValueOnce(reviewedCode);

    render(<App />);

    // Input code
    const inputEditor = screen.getAllByTestId('mock-editor')[0]
      .querySelector('textarea');
    expect(inputEditor).toBeInTheDocument();
    await userEvent.type(inputEditor!, testCode);

    // Change language
    const languageSelector = screen.getByRole('combobox');
    await userEvent.selectOptions(languageSelector, 'javascript');

    // Click review button
    const improveButton = screen.getByText('Improve Code');
    await userEvent.click(improveButton);

    // Wait for review to complete
    await waitFor(() => {
      const outputEditor = screen.getAllByTestId('mock-editor')[1]
        .querySelector('textarea');
      expect(outputEditor).toHaveValue(reviewedCode);
    });

    // Test copy to input
    const copyToInputButton = screen.getByText('Copy to Input');
    await userEvent.click(copyToInputButton);

    expect(inputEditor).toHaveValue(reviewedCode);
  });
});