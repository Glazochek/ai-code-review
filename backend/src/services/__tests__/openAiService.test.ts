import { reviewCode } from '../openAiService'
import OpenAI from 'openai'

jest.mock('openai')

describe('openaiService', () => {
  it('processes review requests correctly', async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      output_text: 'mocked response'
    })

    // Mock constructor + responses.create
    ;(OpenAI as jest.Mock).mockImplementation(() => ({
      responses: {
        create: mockCreate
      }
    }))

    const result = await reviewCode('test code', 'test prompt')

    expect(mockCreate).toHaveBeenCalled()
  })
})
