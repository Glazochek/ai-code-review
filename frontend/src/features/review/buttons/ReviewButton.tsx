import {ReviewButtonProps} from "../types";


export const ReviewButton = ({ func, isLoading, mode }: ReviewButtonProps) => {
  const handleClick = () => {
    if (!isLoading) {
      func(mode);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : mode}
    </button>
  );
};