import express from 'express'
import cors from 'cors'
import reviewRouter from './routes/reviewRouter'

const app = express()

app.use(cors())
app.use(express.json())
app.use(reviewRouter)

export default app