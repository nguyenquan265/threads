import { Message } from '@/type'
import { Avatar, AvatarImage } from '../ui/avatar'
import formatDateString from '@/helpers/formatDateString'

type Props = {
  message: Message
  isSender: boolean
  selectedUserImage: string
  currentUserImage: string
}

const MessageBubble = ({ message, isSender, selectedUserImage, currentUserImage }: Props) => {
  return (
    <div className={`flex items-start gap-3 ${!isSender ? 'justify-end' : ''}`}>
      {isSender && (
        <Avatar>
          <AvatarImage src={selectedUserImage} />
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
          <AvatarImage src={currentUserImage} />
        </Avatar>
      )}
    </div>
  )
}

export default MessageBubble
