import { ScrollArea } from '../ui/scroll-area'
import { useGetMessages } from '@/apis/MessageApi'
import { User } from '@/type'
import ChatHeader from './ChatHeader'
import ChatInput from '../forms/ChatInput'
import MessageBubble from './MessageBubble'

type Props = {
  setSelectedUser: (user?: User) => void
  selectedUser?: User
}

const ChatBox = ({ setSelectedUser, selectedUser }: Props) => {
  const { data: messages, isLoading } = useGetMessages(selectedUser?._id)

  if (!selectedUser) {
    return null
  }

  return (
    <div className='flex-1 flex flex-col'>
      <ChatHeader user={selectedUser} setSelectedUser={setSelectedUser} />

      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-4'>
          {isLoading && <div className='flex items-center justify-center text-light-1 mt-3'>Loading...</div>}

          {messages?.map((message) => (
            <MessageBubble key={message._id} message={message} isSender={message.sender === selectedUser?._id} />
          ))}
        </div>
      </ScrollArea>

      <ChatInput />
    </div>
  )
}

export default ChatBox
