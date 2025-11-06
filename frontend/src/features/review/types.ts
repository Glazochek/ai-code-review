export type ReviewMode = 'improve' | 'faster' | 'shorter';

export interface ReviewButtonProps {
  func: (mode: ReviewMode) => any;
  isLoading: boolean;
  mode: ReviewMode;
}