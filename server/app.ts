import express, { NextFunction, Request, Response } from 'express'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ApiError from './utils/ApiError'
import errorHandler from './middlewares/error.middleware'
import router from './routes'
import path from 'path'

const app = express()
const dirname = path.resolve()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(clerkMiddleware())

app.get('/health', (req: Request, res: Response) => {
  res.send({ message: 'Server is running' })
})
app.use('/api/v1', router)
app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/client/dist')))

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(dirname, 'client', 'dist', 'index.html'))
  })
}

app.use(errorHandler)

export default app
