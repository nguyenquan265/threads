// import { uploadBase64Image, uploadImageFile } from '@/controllers/upload.controller'
// import { authenticate } from '@/middlewares/auth.middleware'
// import { base64ImageUploader, multerUploader } from '@/middlewares/upload.middleware'
import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { base64ImageUploader, multerUploader } from '../middlewares/upload.middleware'
import { uploadBase64Image, uploadImageFile } from '../controllers/upload.controller'

const router = Router()

router.use(clerkMiddleware(), authenticate)
router.post('/base64Image', base64ImageUploader, uploadBase64Image)
router.post('/imageFile', multerUploader.single('image'), uploadImageFile)

export default router
