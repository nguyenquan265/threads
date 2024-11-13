import { useGetUserPosts } from '@/apis/UserApi'
import { Navigate } from 'react-router-dom'
import ThreadCard from '../cards/ThreadCard'

type Props = {
  currentUserId: string
  accountId: string
  accountType: string
}

const ThreadsTab = ({ accountId, accountType, currentUserId }: Props) => {
  const { data, isLoading } = useGetUserPosts(accountId)

  if (isLoading) {
    return null
  }

  if (!data) {
    return <Navigate to='/' />
  }

  if (data.threads.length === 0) {
    return (
      <section className='mt-9 flex flex-col gap-10'>
        <p className='no-result'>
          {accountType === 'User' ? 'This user has not posted any threads yet' : 'TODO: Add message for community'}
        </p>
      </section>
    )
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {data.threads.map((thread) => (
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
      ))}
    </section>
  )
}

export default ThreadsTab
