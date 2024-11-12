import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useCreateComment } from '@/apis/ThreadApi'

const commentSchema = z.object({
  thread: z.string().min(3, { message: 'Minimum 3 characters.' })
})

export type CommentData = z.infer<typeof commentSchema>

type Props = {
  threadId: string
  currentUserImg: string
  currentUserId: string
}

const CommentForm = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const { addComment, isPending } = useCreateComment()
  const form = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      thread: ''
    }
  })

  const onSubmit = async (data: CommentData) => {
    await addComment({ commentText: data.thread, userId: currentUserId, threadId })

    form.reset()
  }

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                <img
                  src={currentUserImg}
                  alt='current user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input type='text' placeholder='Comment...' className='no-focus text-light-1 outline-none' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn' disabled={isPending}>
          {isPending ? 'Posting...' : 'Reply'}
        </Button>
      </form>
    </Form>
  )
}

export default CommentForm
