import express from 'express'
import { reviewCode } from '../services/openaiService'

const router = express.Router()

router.post('/review', async (req, res) => {
  const { code, prompt } = req.body

  try {
    const reviewedCode = await reviewCode(code, prompt)
    res.json({ reviewedCode })
  } catch (error) {
    res.status(500).json({ error: 'Review failed' })
  }
})

export default router
