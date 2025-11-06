import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { reviewCode } from '../features/api';
import '@testing-library/jest-dom';

jest.mock('../features/api/ApiService');
const mockedReviewCode = reviewCode as jest.MockedFunction<typeof reviewCode>;

describe('App Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('AI Code Review')).toBeInTheDocument();
  });

  it('completes full review workflow', async () => {
    const testCode = 'function test() { return 1; }';
    const reviewedCode = 'function test() {\n  return 1;\n}';

    mockedReviewCode.mockResolvedValueOnce(reviewedCode);

    render(<App />);

    const inputEditor = screen.getAllByTestId('mock-editor')[0]
      .querySelector('textarea');
    expect(inputEditor).toBeInTheDocument();
    await userEvent.type(inputEditor!, testCode);

    const languageSelector = screen.getByRole('combobox');
    await userEvent.selectOptions(languageSelector, 'javascript');

    const improveButton = screen.getByText('Improve Code');
    await userEvent.click(improveButton);

    await waitFor(() => {
      const outputEditor = screen.getAllByTestId('mock-editor')[1]
        .querySelector('textarea');
      expect(outputEditor).toHaveValue(reviewedCode);
    });

    const copyToInputButton = screen.getByText('Copy to Input');
    await userEvent.click(copyToInputButton);

    expect(inputEditor).toHaveValue(reviewedCode);
  });
});