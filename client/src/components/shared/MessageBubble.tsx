import { Message } from '@/type'
import { Avatar, AvatarImage } from '../ui/avatar'

type Props = {
  message: Message
  isSender: boolean
}

const MessageBubble = ({ message, isSender }: Props) => {
  return (
    <div className={`flex items-start gap-3 ${isSender ? 'justify-end' : ''}`}>
      {!isSender && (
        <Avatar>
          <AvatarImage src={message.img} />
          {/* <AvatarFallback>{message.sender[0]}</AvatarFallback> */}
        </Avatar>
      )}

      <div className='max-w-[50%]'>
        <div className='bg-zinc-800 rounded-lg p-3'>
          <p className='text-light-1'>{message.text}</p>
        </div>
        <div className='text-sm text-zinc-400 mt-1'>{message.createdAt}</div>
      </div>

      {isSender && (
        <Avatar>
          <AvatarImage src={message.img} />
          {/* <AvatarFallback>{message.sender[0]}</AvatarFallback> */}
        </Avatar>
      )}
    </div>
  )
}

export default MessageBubble
