import { uploadImage } from '@/controllers/upload.controller'
import uploader from '@/middlewares/upload.middleware'
import { requireAuth } from '@clerk/express'
import { Router } from 'express'

const router = Router()

router.post('/', requireAuth(), uploader.single('image'), uploadImage)
router.post('/test', uploader.single('image'), uploadImage)

export default router
