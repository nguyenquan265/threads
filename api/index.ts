import 'dotenv/config'
import app from './app'
// import connectDB from './config/db'

const PORT = process.env.PORT || 3000

;(async () => {
  // await connectDB()

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})()