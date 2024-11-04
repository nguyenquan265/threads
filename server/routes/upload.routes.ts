import { uploadBase64Image, uploadImageFile } from '@/controllers/upload.controller'
import { base64ImageUploader, multerUploader } from '@/middlewares/upload.middleware'
import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'

const router = Router()

router.use(clerkMiddleware())
router.post('/base64Image', base64ImageUploader, uploadBase64Image)
router.post('/imageFile', multerUploader.single('image'), uploadImageFile)

export default router
