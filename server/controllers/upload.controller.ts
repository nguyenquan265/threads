import cloudinary from '@/config/cloudinary'
import asyncHandler from '@/utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'

export const uploadImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const base64Image = req.body.image
  const ressult = await cloudinary.uploader.upload(base64Image, { folder: 'file-upload' })

  res.status(200).json(ressult.secure_url)
})
