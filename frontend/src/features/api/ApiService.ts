import { ReviewMode } from '../review';

const API_URL = 'http://localhost:3001';

const REVIEW_PROMPTS = {
  improve: 'Review and improve this code by fixing bugs, enhancing readability, and following best practices. Return only the improved code. RESPOND ONLY BY CODE BLOCK.',
  faster: 'Optimize this code for better performance. Focus on algorithmic efficiency and performance improvements. Return only the optimized code. RESPOND ONLY BY CODE BLOCK.',
  shorter: 'Refactor this code to be more concise while maintaining functionality. Focus on reducing lines of code and removing redundancy. Return only the shortened code. RESPOND ONLY BY CODE BLOCK.'
};

export const reviewCode = async (code: string, mode: ReviewMode): Promise<string> => {
  console.log("11111");

  const response = await fetch(`${API_URL}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      prompt: REVIEW_PROMPTS[mode]
    }),
  });

  const data = await response.json();
  return data.reviewedCode;
};