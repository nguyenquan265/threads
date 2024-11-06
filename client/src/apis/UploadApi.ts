import { useAuth } from '@clerk/clerk-react'
import { useMutation } from 'react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useUploadImage = () => {
  const { getToken } = useAuth()

  const createUploadImageRequest = async (imageFileData: FormData): Promise<string> => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/upload/imageFile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: imageFileData
    })

    if (!res.ok) {
      throw new Error('Failed to upload image')
    }

    return res.json()
  }

  const { mutateAsync: startUpload, isLoading } = useMutation(createUploadImageRequest)

  return { startUpload, isLoading }
}
