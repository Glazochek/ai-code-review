import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewButton } from '../buttons';

describe('ReviewButton', () => {
  it('calls onClick with mode', () => {
    const onClick = jest.fn();
    render(
      <ReviewButton
        mode="improve"
        onClick={onClick}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('improve');
  });
});
