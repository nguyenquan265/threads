import { useUserContext } from '@/contexts/UserContext'
import MessageBubble from './MessageBubble'
import { useSocketContext } from '@/contexts/SocketContext'
import { useGetMessages } from '@/apis/MessageApi'
import { useEffect } from 'react'
import { Message, User } from '@/type'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  currentUser: User
}

const ChatContent = ({ currentUser }: Props) => {
  const { selectedUser } = useUserContext()
  const { socket, setSocket } = useSocketContext()
  const { data: result, isLoading } = useGetMessages(selectedUser?._id)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: Message) => {
        if (!message) return

        if (!result?.conversation) {
          queryClient.invalidateQueries({ queryKey: ['messages'] })
        }

        if (message.conversationId === result?.conversation._id) {
          queryClient.setQueryData(['messages', { otherUserObjectId: selectedUser?._id }], (prev: any) => {
            return {
              messages: [...(prev.messages || []), message],
              conversation: prev.conversation
            }
          })
        }
      })

      setSocket(socket)

      return () => {
        socket.off('newMessage')
      }
    }
  }, [socket, setSocket, result])

  if (!selectedUser) {
    return null
  }

  return (
    <div className='space-y-4'>
      {isLoading && <div className='flex items-center justify-center text-light-1 mt-3'>Loading...</div>}

      {(result?.messages || []).map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isSender={
            typeof message.sender === 'string'
              ? message.sender === selectedUser._id
              : message.sender._id === selectedUser._id
          }
          selectedUserImage={selectedUser.image}
          currentUserImage={currentUser.image}
        />
      ))}
    </div>
  )
}

export default ChatContent
