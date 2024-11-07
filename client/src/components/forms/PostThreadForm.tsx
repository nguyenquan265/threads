import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const postThreadSchema = z.object({
  thread: z.string().min(3, { message: 'Minimum 3 characters.' }),
  accountId: z.string()
})

export type PostThreadData = z.infer<typeof postThreadSchema>

type Props = {
  userId: string
}

const PostThreadForm = ({ userId }: Props) => {
  const form = useForm<PostThreadData>({
    resolver: zodResolver(postThreadSchema),
    defaultValues: {
      thread: '',
      accountId: userId
    }
  })

  return (
    <Form {...form}>
      <form className='mt-10 flex flex-col justify-start gap-10'>
        <FormField
          control={form.control}
          name='thread'
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
          Post Thread
        </Button>
      </form>
    </Form>
  )
}

export default PostThreadForm
