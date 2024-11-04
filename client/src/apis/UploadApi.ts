import { useMutation } from 'react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useUploadImage = () => {
  const createUploadImageRequest = async (imageFileData: FormData): Promise<string> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/upload/imageFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      credentials: 'include',
      body: imageFileData
    })

    if (!res.ok) {
      throw new Error('Failed to upload image')
    }

    return res.json()
  }

  const { mutate: startUpload, isLoading, isError, error } = useMutation(createUploadImageRequest)

  if (isError) {
    console.error(error)
  }

  return { startUpload, isLoading }
}
