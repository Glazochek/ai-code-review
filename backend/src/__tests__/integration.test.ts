import request from 'supertest';
import app from '../app';
import { reviewCode } from '../services/openaiService';

jest.mock('../services/openaiService');

describe('API Integration', () => {
  const mockReviewCode = reviewCode as jest.MockedFunction<typeof reviewCode>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockReviewCode.mockResolvedValue('improved code');
  });

  it('completes full review workflow', async () => {
    const testCases = [
      {
        mode: 'improve',
        code: 'function test() { return 1 }',
        expectedPrompt: 'Review and improve this code'
      },
      {
        mode: 'faster',
        code: 'function slow() { return Array(1000).fill(0).reduce((a,b)=>a+b) }',
        expectedPrompt: 'Optimize this code for better performance'
      },
      {
        mode: 'shorter',
        code: 'function verbose() { let x = 1; let y = 2; return x + y }',
        expectedPrompt: 'Refactor this code to be more concise'
      }
    ];

    for (const testCase of testCases) {
      const response = await request(app)
        .post('/review')
        .send({
          code: testCase.code,
          prompt: testCase.expectedPrompt
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('reviewedCode');
      expect(response.body.reviewedCode).toBe('improved code');
    }
  });
});