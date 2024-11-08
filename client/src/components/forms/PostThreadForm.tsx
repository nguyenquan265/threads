import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { usePostThread } from '@/apis/ThreadApi'
import { useNavigate } from 'react-router-dom'
// import { useOrganization } from '@clerk/clerk-react'

const postThreadSchema = z.object({
  text: z.string().min(3, { message: 'Minimum 3 characters.' }),
  // accountId: z.string()
  author: z.string(),
  communityId: z.string().nullable()
})

export type PostThreadData = z.infer<typeof postThreadSchema>

type Props = {
  userObjectId: string
}

const PostThreadForm = ({ userObjectId }: Props) => {
  const { postThread, isPending } = usePostThread()
  // const { organization } = useOrganization()
  const navigate = useNavigate()

  const form = useForm<PostThreadData>({
    resolver: zodResolver(postThreadSchema),
    defaultValues: {
      text: '',
      // accountId: userObjectId
      author: userObjectId,
      communityId: null
    }
  })

  const onSubmit = async (values: PostThreadData) => {
    await postThread({
      text: values.text,
      author: values.author,
      communityId: values.communityId
    })

    navigate('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-10 flex flex-col justify-start gap-10'>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>Content</FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          {isPending ? 'Posting...' : 'Post Thread'}
        </Button>
      </form>
    </Form>
  )
}

export default PostThreadForm
