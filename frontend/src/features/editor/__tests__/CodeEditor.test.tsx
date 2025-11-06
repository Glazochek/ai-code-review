import { render, screen } from '@testing-library/react';
import { CodeEditor } from '../CodeEditor';
import '@testing-library/jest-dom';

jest.mock('@monaco-editor/react', () => ({
  Editor: ({ value, onChange }: any) => (
    <div data-testid="mock-editor">
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  ),
}));

describe('CodeEditor', () => {
  // Smoke test
  it('renders without crashing', () => {
    render(<CodeEditor value="" />);
    expect(screen.getByTestId('mock-editor')).toBeInTheDocument();
  });

  it('passes correct props to Editor', () => {
    const value = 'test code';
    const onChange = jest.fn();

    render(
      <CodeEditor
        value={value}
        onChange={onChange}
        language="typescript"
        theme="vs-dark"
      />
    );

    const editor = screen.getByTestId('mock-editor');
    expect(editor).toBeInTheDocument();
  });
});