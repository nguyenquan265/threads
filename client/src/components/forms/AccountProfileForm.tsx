import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import profilePhoto from '@/assets/profile.svg'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import isBase64Image from '@/helpers/isBase64Image'
import { useUploadImage } from '@/apis/UploadApi'
import { useUpdateUser } from '@/apis/UserApi'
import { useLocation, useNavigate } from 'react-router-dom'

const accountProfileSchema = z.object({
  profile_photo: z.string().url().min(1),
  name: z.string().min(3, { message: 'Minimum 3 characters.' }).max(30, { message: 'Maximum 30 caracters.' }),
  username: z.string().min(3, { message: 'Minimum 3 characters.' }).max(30, { message: 'Maximum 30 caracters.' }),
  bio: z.string().min(3, { message: 'Minimum 3 characters.' }).max(1000, { message: 'Maximum 1000 caracters.' })
})

export type AccountProfileData = z.infer<typeof accountProfileSchema>

type Props = {
  user: {
    clerkId: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}

const AccountProfileForm = ({ user, btnTitle }: Props) => {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload, isPending: isImageUploading } = useUploadImage()
  const { updateUser, isPending: isUserUpdating } = useUpdateUser()
  const location = useLocation()
  const navigate = useNavigate()

  const form = useForm<AccountProfileData>({
    resolver: zodResolver(accountProfileSchema),
    defaultValues: {
      profile_photo: user.image || '',
      name: user.name || '',
      username: user.username || '',
      bio: user.bio || ''
    }
  })

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    // change the image preview
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setFiles(Array.from(e.target.files)) // Save the file to state to submit it later

      if (!file.type.includes('image')) return

      // khoi tao ham onload cho fileReader
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''

        fieldChange(imageDataUrl) // set the image data url to the form field
      }

      // chuyen file sang base64, sau khi chuyen xong se chay ham onload
      // file sau khi chuyen dinh dang xong se duoc luu trong event.target.result
      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: AccountProfileData) => {
    const isImageChanged = isBase64Image(values.profile_photo)

    if (isImageChanged) {
      const formData = new FormData()
      formData.append('image', files[0])

      const imageRes = await startUpload(formData)

      if (imageRes) {
        values.profile_photo = imageRes
      }
    }

    await updateUser(values)

    if (location.pathname === '/profile/edit') {
      navigate(-1) // Quay lại trang trước đó
    } else {
      navigate('/') // Điều hướng đến trang chủ
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-start gap-10'>
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <img
                    src={field.value}
                    alt='profile photo'
                    width={96}
                    height={96}
                    className='rounded-full object-contain'
                  />
                ) : (
                  <img src={profilePhoto} alt='profile photo' width={24} height={24} className='object-contain' />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>Name</FormLabel>
              <FormControl>
                <Input type='text' className='account-form_input no-focus' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>Username</FormLabel>
              <FormControl>
                <Input type='text' className='account-form_input no-focus' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>Bio</FormLabel>
              <FormControl>
                <Textarea rows={10} className='account-form_input no-focus' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          {isImageUploading || isUserUpdating ? 'Loading...' : btnTitle}
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfileForm
