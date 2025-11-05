import request from 'supertest';
import app from '../app';
import { reviewCode } from '../services/openaiService';

jest.mock('../services/openaiService');

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Unit test for review endpoint
  it('handles review endpoint', async () => {
    const mockReviewCode = reviewCode as jest.MockedFunction<typeof reviewCode>;
    mockReviewCode.mockResolvedValue('improved code');

    const response = await request(app)
      .post('/review')
      .send({
        code: 'test code',
        prompt: 'test prompt'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ reviewedCode: 'improved code' });
  });

  // Error handling test
  it('handles errors in review endpoint', async () => {
    const mockReviewCode = reviewCode as jest.MockedFunction<typeof reviewCode>;
    mockReviewCode.mockRejectedValue(new Error('Test error'));

    const response = await request(app)
      .post('/review')
      .send({
        code: 'test code',
        prompt: 'test prompt'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Review failed' });
  });
});