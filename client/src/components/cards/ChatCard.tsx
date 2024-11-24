import { User } from '@/type'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Props = {
  user: User
  setSelectedUser: (user: User) => void
  text?: string
}

const ChatCard = ({ user, setSelectedUser, text }: Props) => {
  return (
    <div className='flex items-center gap-3 p-4 hover:bg-zinc-800 cursor-pointer' onClick={() => setSelectedUser(user)}>
      <Avatar>
        <AvatarImage src={user.image} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      <div className='flex-1 min-w-0'>
        <div className='font-medium text-light-1'>{user.username}</div>
        <div className='text-sm text-zinc-400'>{text}</div>
      </div>
    </div>
  )
}

export default ChatCard
