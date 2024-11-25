import { ImagePlus, PlusCircle, Send, Smile } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { useSendMessage } from '@/apis/MessageApi'
import { zodResolver } from '@hookform/resolvers/zod'

const messageSchema = z.object({
  message: z.string(),
  recipientId: z.string()
})

export type MessageData = z.infer<typeof messageSchema>

type Props = {
  otherUserObjectId: string
}

const ChatInput = ({ otherUserObjectId }: Props) => {
  const { sendMessage, isPending } = useSendMessage()
  const form = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
      recipientId: ''
    }
  })

  const onSubmit = async (data: MessageData) => {
    await sendMessage({
      message: data.message,
      recipientId: otherUserObjectId
    })

    form.reset()
  }

  return (
    <div className='p-4 border-t border-zinc-800'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon'>
              <PlusCircle className='h-5 w-5' />
            </Button>

            <Button variant='ghost' size='icon'>
              <ImagePlus className='h-5 w-5' />
            </Button>

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl className='bg-zinc-800 border-zinc-700'>
                    <Input
                      type='text'
                      placeholder='Type a message...'
                      className='placeholder-primary-500  text-light-1'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button variant='ghost' size='icon'>
              <Smile className='h-5 w-5' />
            </Button>

            <Button type='submit' disabled={isPending} size='icon' className='bg-primary-500'>
              <Send className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput
