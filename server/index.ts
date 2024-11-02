import 'dotenv/config'
import app from './app'
import connectDB from './config/db'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await connectDB()

  console.log(`Server is running on port ${PORT}`)
})
