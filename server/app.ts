import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ApiError from './utils/ApiError'
import errorHandler from './middlewares/error.middleware'
import router from './routes'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
)
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/health', (req: Request, res: Response) => {
  res.json(200).send({ message: 'Server is running' })
})
app.use('/api/v1', router)
app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
})

app.use(errorHandler)

export default app
