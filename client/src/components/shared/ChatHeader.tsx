import { ArrowLeft, Camera, Info, Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@/type'

type Props = {
  user: User
  setSelectedUser: (user?: User) => void
}

const ChatHeader = ({ user, setSelectedUser }: Props) => {
  return (
    <div className='flex items-center justify-between p-4 border-b border-zinc-800'>
      <div className='flex items-center gap-3'>
        <Button className='md:hidden' variant='ghost' size='icon' onClick={() => setSelectedUser(undefined)}>
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback className='text-light-1'>{user.username}</AvatarFallback>
        </Avatar>
        <div>
          <div className='font-medium text-light-1'>{user.username}</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon'>
          <Phone className='h-5 w-5' />
        </Button>
        <Button variant='ghost' size='icon'>
          <Camera className='h-5 w-5' />
        </Button>
        <Button variant='ghost' size='icon'>
          <Info className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}

export default ChatHeader
