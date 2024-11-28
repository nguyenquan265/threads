import 'dotenv/config'
import connectDB from './config/db'
import cron from 'node-cron'
import https from 'https'
import { server } from './socket'

const PORT = process.env.PORT || 3000
const URL = process.env.SERVER_URL_HEALTH as string

const ping = () => {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log('GET request sent successfully')
      } else {
        console.log('GET request failed', res.statusCode)
      }
    })
    .on('error', (e) => {
      console.error('Error while sending request', e)
    })
}

server.listen(PORT, async () => {
  await connectDB()

  console.log(`Server is running on port ${PORT}`)
})

cron.schedule('*/14 * * * *', ping)
