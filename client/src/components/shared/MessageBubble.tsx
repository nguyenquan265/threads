import { Message } from '@/type'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import formatDateString from '@/helpers/formatDateString'

type Props = {
  message: Message
  isSender: boolean
}

const MessageBubble = ({ message, isSender }: Props) => {
  return (
    <div className={`flex items-start gap-3 ${!isSender ? 'justify-end' : ''}`}>
      {isSender && (
        <Avatar>
          <AvatarImage src={message.sender.image} />
          <AvatarFallback>{message.sender.name}</AvatarFallback>
        </Avatar>
      )}

      <div className='max-w-[50%]'>
        <div className='bg-zinc-800 rounded-lg p-3'>
          <p className='text-light-1'>{message.text}</p>
        </div>
        <div className='text-tiny-medium text-zinc-400 mt-1'>{formatDateString(message.createdAt)}</div>
      </div>

      {!isSender && (
        <Avatar>
          <AvatarImage src={message.sender.image} />
          <AvatarFallback>{message.sender.name}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export default MessageBubble
