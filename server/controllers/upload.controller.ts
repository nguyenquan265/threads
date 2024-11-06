// import cloudinary from '@/config/cloudinary'
// import asyncHandler from '@/utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import cloudinary from '../config/cloudinary'

interface UploadBase64ImageRequest extends Request {
  body: {
    image: string
  }
}

export const uploadBase64Image = asyncHandler(
  async (req: UploadBase64ImageRequest, res: Response, next: NextFunction) => {
    const base64Image = req.body.image
    const ressult = await cloudinary.uploader.upload(base64Image, { folder: 'file-upload' })

    res.status(200).json(ressult.secure_url)
  }
)

interface UploadImageFileRequest extends Request {
  file: Express.Multer.File
}

export const uploadImageFile = asyncHandler(async (req: UploadImageFileRequest, res: Response, next: NextFunction) => {
  const file = req.file
  const base64Image = file.buffer.toString('base64')
  const dataURI = `data:${file.mimetype};base64,${base64Image}`

  const ressult = await cloudinary.uploader.upload(dataURI, { folder: 'file-upload' })

  res.status(200).json(ressult.secure_url)
})
