import { ImagePlus, Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useSendMessage } from '@/apis/MessageApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserContext } from '@/contexts/UserContext'
import { useUploadImage } from '@/apis/UploadApi'

const messageSchema = z.object({
  message: z.string().min(1),
  image: z.string().optional(),
  recipientId: z.string()
})

export type MessageData = z.infer<typeof messageSchema>

const ChatInput = () => {
  const { selectedUser } = useUserContext()
  const { startUpload, isPending: isImageUploading } = useUploadImage()
  const { sendMessage, isPending } = useSendMessage()

  const form = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
      image: '',
      recipientId: ''
    }
  })

  if (!selectedUser) {
    return null
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const formData = new FormData()

      formData.append('image', file)

      const imageRes = await startUpload(formData)

      await sendMessage({
        message: '',
        image: imageRes,
        recipientId: selectedUser._id
      })

      form.reset()
    }
  }

  const onSubmit = async (data: MessageData) => {
    await sendMessage({
      message: data.message,
      image: '',
      recipientId: selectedUser._id
    })

    form.reset()
  }

  return (
    <div className='p-4 border-t border-zinc-800 max-h-[73px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex items-center gap-2'>
            <FormField
              control={form.control}
              name='image'
              render={() => (
                <FormItem className='flex items-center gap-4'>
                  <FormLabel>
                    <div className='cursor-pointer hover:bg-primary-500 p-1 rounded-sm'>
                      <ImagePlus className='h-5 w-5' />
                    </div>
                  </FormLabel>
                  <FormControl className='flex-1'>
                    <Input type='file' accept='image/*' className='hidden' onChange={(e) => handleImage(e)} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl className='bg-zinc-800 border-zinc-700'>
                    <Input
                      type='text'
                      disabled={isPending || isImageUploading}
                      placeholder='Type a message...'
                      className='placeholder-primary-500  text-light-1'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isPending || isImageUploading} size='icon' className='bg-primary-500'>
              <Send className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput
