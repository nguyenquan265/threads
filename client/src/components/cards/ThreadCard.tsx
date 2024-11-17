import { Link } from 'react-router-dom'
import GrayHeart from '@/assets/heart-gray.svg'
import Reply from '@/assets/reply.svg'
import Repost from '@/assets/repost.svg'
import Share from '@/assets/share.svg'
import formatDateString from '@/helpers/formatDateString'

type Props = {
  id: string
  currentUserId: string
  parentId: string | null
  content: string
  author: {
    name: string
    image: string
    clerkId: string
  }
  community: {
    clerkId: string
    name: string
    image: string
    createdAt: string
  } | null
  createdAt: string
  comments: {
    author: {
      image: string
    }
  }[]
  isComment?: boolean
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment
}: Props) => {
  return (
    <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
      <div className='flex items-center justify-between'>
        {/* Show main content of post */}
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link to={`/profile/${author.clerkId}`} className='relative h-11 w-11'>
              <img src={author.image} alt='Profile image' className='cursor-pointer rounded-full' loading='lazy' />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link to={`/profile/${author.clerkId}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <img
                  src={GrayHeart}
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                  loading='lazy'
                />
                <Link to={`/thread/${id}`}>
                  <img
                    src={Reply}
                    alt='reply'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                    loading='lazy'
                  />
                </Link>
                <img
                  src={Repost}
                  alt='repost'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                  loading='lazy'
                />
                <img
                  src={Share}
                  alt='share'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                  loading='lazy'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link to={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>{comments.length} replies</p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Delete thread */}

        {/* Show comments logo */}
      </div>

      {/* Show community of the post (if have) */}
      {!isComment && community && (
        <Link to={`/communities/${community.clerkId}`} className='mt-5 flex items-center'>
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(community.createdAt)} - {community.name} Community
          </p>

          <img
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
            loading='lazy'
          />
        </Link>
      )}
    </article>
  )
}

export default ThreadCard
