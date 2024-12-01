import { useGetConversations } from '@/apis/MessageApi'
import ChatCard from '../cards/ChatCard'
import { ScrollArea } from '../ui/scroll-area'
import { useUserContext } from '@/contexts/UserContext'
import { useSocketContext } from '@/contexts/SocketContext'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const ChatList = () => {
  const { setSelectedUser } = useUserContext()
  const { socket, setSocket, onlineUsers } = useSocketContext()
  const { data: userConversations, isLoading: isGetUserConversations } = useGetConversations()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (socket) {
      socket.on('updateConversation', (newConversation) => {
        if (!newConversation) {
          return
        }

        queryClient.invalidateQueries({ queryKey: ['conversations'] })
      })

      setSocket(socket)

      return () => {
        socket.off('updateConversation')
      }
    }
  }, [socket, setSocket, userConversations])

  return (
    <ScrollArea className='h-[calc(100vh-2.5rem-7rem-4px-50px-89px-0.5rem)]'>
      {isGetUserConversations && <div className='text-light-1 flex justify-center mt-3'>Loading conversations...</div>}

      {userConversations?.map((conversation) => {
        const otherUser = conversation.participants[0]

        return (
          <ChatCard
            key={conversation._id}
            user={otherUser}
            isOnline={onlineUsers.includes(otherUser._id)}
            conversation={conversation}
            setSelectedUser={() => setSelectedUser(otherUser)}
          />
        )
      })}
    </ScrollArea>
  )
}

export default ChatList
