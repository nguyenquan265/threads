import { PostThreadData } from '@/components/forms/PostThreadForm'
import { Thread } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type GetPostsResponse = {
  posts: Thread[]
  isNext: boolean
}

export const useGetPosts = (page: number = 1, limit: number = 20) => {
  const getPostsRequest = async (): Promise<GetPostsResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/threads?page=${page}&limit=${limit}`)

    if (!res.ok) {
      throw new Error('Failed to get posts.')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['posts', { page }, { limit }],
    queryFn: getPostsRequest
  })

  return { data, isLoading }
}

export const useCreateThread = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

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
    mutationFn: createPostThreadRequest,
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })

  return { postThread, isPending }
}

export const useGetSingleThread = (id: string) => {
  const getSingleThreadRequest = async (): Promise<Thread> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/threads/${id}`)

    if (!res.ok) {
      throw new Error('Failed to get thread.')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['thread', { id }],
    queryFn: getSingleThreadRequest
  })

  return { data, isLoading }
}

export const useCreateComment = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createCommentRequest = async (commentData: { commentText: string; userId: string; threadId: string }) => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/threads/${commentData.threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(commentData)
    })

    if (!res.ok) {
      throw new Error('Failed to post comment.')
    }

    return res.json()
  }

  const { mutateAsync: addComment, isPending } = useMutation({
    mutationFn: createCommentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })

  return { addComment, isPending }
}
