import express, { NextFunction, Request, Response } from 'express'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ApiError from './utils/ApiError'
import errorHandler from './middlewares/error.middleware'
import router from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(clerkMiddleware())

app.get('/health', (req: Request, res: Response) => {
  res.send({ message: 'Server is running' })
})
// app.get('/api/v1/protected', requireAuth(), (req, res) => {
//   res.send('This is a protected route')
// })
app.use('/api/v1', router)
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
})
app.use(errorHandler)

export default app
