import express from 'express'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(clerkMiddleware())

app.get('/api/v1/protected', requireAuth(), (req, res) => {
  res.send('This is a protected route')
})

app.get('/api/v1/hello', (req, res) => {
  res.send('Hello World!')
})

export default app
