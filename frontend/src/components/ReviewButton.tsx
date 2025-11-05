export type ReviewMode = 'improve' | 'faster' | 'shorter';

interface ReviewButtonProps {
  func: (mode: ReviewMode) => any;
  isLoading: boolean;
  mode: ReviewMode;
}

export const ReviewButton = ({ func, isLoading, mode }: ReviewButtonProps) => {
  const handleClick = () => {
    if (!isLoading) {
      func(mode);
    }
  };

  return (
    <button
      className={`button button-${mode}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : mode}
    </button>
  );
};