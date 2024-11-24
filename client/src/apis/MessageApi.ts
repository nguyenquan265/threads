import { Conversation, Message, User } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetConversations = () => {
  const { getToken, userId } = useAuth()

  const createGetConversationsRequest = async (): Promise<Conversation[]> => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/messages/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to get conversations')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['conversations', { clerkId: userId }],
    queryFn: createGetConversationsRequest,
    enabled: !!userId,
    staleTime: 0
  })

  return { data, isLoading }
}

export const useGetMessages = (otherUserObjectId?: string) => {
  const { getToken } = useAuth()

  const createGetMessagesRequest = async (): Promise<Message[]> => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/messages/${otherUserObjectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to get messages')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['messages', { otherUserObjectId }],
    queryFn: createGetMessagesRequest,
    enabled: !!otherUserObjectId,
    staleTime: 0
  })

  return { data, isLoading }
}

export const useSendMessage = () => {}
