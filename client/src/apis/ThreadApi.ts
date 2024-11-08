import { PostThreadData } from '@/components/forms/PostThreadForm'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const usePostThread = () => {
  const { getToken } = useAuth()

  const createPostThreadRequest = async (threadData: PostThreadData) => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(threadData)
    })

    if (!res.ok) {
      throw new Error('Failed to post thread.')
    }

    return res.json()
  }

  const { mutateAsync: postThread, isPending } = useMutation({
    mutationFn: createPostThreadRequest
  })

  return { postThread, isPending }
}
