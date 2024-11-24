import { ImagePlus, PlusCircle, Send, Smile } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const ChatInput = () => {
  return (
    <div className='p-4 border-t border-zinc-800'>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon'>
          <PlusCircle className='h-5 w-5' />
        </Button>
        <Button variant='ghost' size='icon'>
          <ImagePlus className='h-5 w-5' />
        </Button>
        <Input
          placeholder='Type a message...'
          className='flex-1 bg-zinc-800 border-zinc-700 placeholder-primary-500  text-light-1'
        />
        <Button variant='ghost' size='icon'>
          <Smile className='h-5 w-5' />
        </Button>
        <Button size='icon' className='bg-primary-500'>
          <Send className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
