import { useGetSingleThread } from '@/apis/ThreadApi'
import { useGetUser } from '@/apis/UserApi'
import ThreadCard from '@/components/cards/ThreadCard'
import Loader from '@/components/shared/Loader'
import { Navigate, useParams } from 'react-router-dom'

const ThreadPage = () => {
  const { id } = useParams()
  const { data: userInfo, isLoading: isUserLoading } = useGetUser()
  const { data: thread, isLoading: isPostLoading } = useGetSingleThread(id || '')

  if (!id) return null

  if (isUserLoading || isPostLoading) {
    return <Loader />
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  if (!thread) {
    return null
  }

  return (
    <section className='relative'>
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={userInfo.clerkId}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
      />
    </section>
  )
}

export default ThreadPage
