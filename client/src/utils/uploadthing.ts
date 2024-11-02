import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
  type GenerateTypedHelpersOptions
} from '@uploadthing/react'

const initOpts = {
  url: import.meta.env.SERVER_URL_UPLOADTHING as string
} satisfies GenerateTypedHelpersOptions

export const UploadButton = generateUploadButton<OurFileRouter>(initOpts)
export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts)

export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts)
