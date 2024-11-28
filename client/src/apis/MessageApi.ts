import { MessageData } from '@/components/forms/ChatInput'
import { Conversation, Message } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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

  const createGetMessagesRequest = async (): Promise<{ messages: Message[]; conversation: Conversation }> => {
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

export const useSendMessage = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createSendMessageRequest = async (data: MessageData): Promise<Message> => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to send message')
    }

    return res.json()
  }

  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: createSendMessageRequest,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['messages'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }
  })

  return { sendMessage, isPending }
}
