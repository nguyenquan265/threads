import { Link } from 'react-router-dom'
import EditLogo from '@/assets/edit.svg'

type Props = {
  accountId: string
  currentUserId: string
  name: string
  username: string
  imgUrl: string
  bio: string
  type?: string
}

const ProfileHeader = ({ accountId, currentUserId, bio, imgUrl, name, username, type }: Props) => {
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <img src={imgUrl} alt='profile image' className='rounded-full object-cover shadow-2xl' loading='lazy' />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>{name}</h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>

        {accountId === currentUserId && type !== 'Community' && (
          <Link to='/profile/edit'>
            <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
              <img src={EditLogo} alt='logout' width={16} height={16} />

              <p className='text-light-2 max-sm:hidden'>Edit</p>
            </div>
          </Link>
        )}
      </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  )
}

export default ProfileHeader
