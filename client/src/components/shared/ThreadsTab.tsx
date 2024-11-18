import { useGetUserPosts } from '@/apis/UserApi'
import ThreadCard from '../cards/ThreadCard'
import { Community, User } from '@/type'
import { useGetCommunityPosts } from '@/apis/CommunityApi'
import ThreadCardSkeleton from './ThreadCardSkeleton'

type Props = {
  currentUserId: string
  accountId: string
  accountType: string
}

const ThreadsTab = ({ accountId, accountType, currentUserId }: Props) => {
  let result: {
    data?: User | Community
    isLoading: boolean
  }

  if (accountType === 'Community') {
    result = useGetCommunityPosts(accountId)
  } else {
    result = useGetUserPosts(accountId)
  }

  const { data, isLoading } = result

  if (!data) {
    return (
      <section className='mt-9 flex flex-col gap-10'>
        <p className='no-result'>Something wrong! Please try again.</p>
      </section>
    )
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {isLoading && <ThreadCardSkeleton />}

      {data.threads.length === 0 ? (
        <p className='no-result'>
          {accountType === 'User' ? 'This user has not posted any threads yet' : 'This community has no threads yet'}
        </p>
      ) : (
        data.threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === 'User' ? { name: data.name, image: data.image, clerkId: data.clerkId } : thread.author
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        ))
      )}
    </section>
  )
}

export default ThreadsTab
