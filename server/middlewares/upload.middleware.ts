import { uploadRouter } from '@/config/uploadthing'
import { createRouteHandler } from 'uploadthing/express'

const uploadHandler = createRouteHandler({
  router: uploadRouter
})

export default uploadHandler
