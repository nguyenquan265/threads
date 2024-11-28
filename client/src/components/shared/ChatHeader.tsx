import { ArrowLeft, Camera, Info, Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useUserContext } from '@/contexts/UserContext'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useUserContext()

  if (!selectedUser) {
    return null
  }

  return (
    <div className='flex items-center justify-between max-md:p-2 p-4 border-b border-zinc-800 max-h-[73px]'>
      <div className='flex items-center gap-3'>
        <Button className='md:hidden' variant='ghost' size='icon' onClick={() => setSelectedUser(undefined)}>
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <Avatar>
          <AvatarImage src={selectedUser.image} />
          <AvatarFallback className='text-light-1'>{selectedUser.username}</AvatarFallback>
        </Avatar>
        <div>
          <div className='font-medium text-light-1'>{selectedUser.username}</div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
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
