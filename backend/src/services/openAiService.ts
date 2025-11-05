import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const reviewCode = async (code: string, prompt: string): Promise<string> => {
  const result = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: code,
      }
    ]
  })

  let rtn =  result.output_text

  if (rtn.includes("```")) {
    const lines = rtn.split("\n");
    rtn = lines.slice(1, lines.length - 1).join("\n");
  }

  return rtn ?? code
  //return "Use your own OPENAI_API_KEY"
}
