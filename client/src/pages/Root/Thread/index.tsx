import { useGetSingleThread } from '@/apis/ThreadApi'
import { useGetUser } from '@/apis/UserApi'
import ThreadCard from '@/components/cards/ThreadCard'
import CommentForm from '@/components/forms/CommentForm'
import { Navigate, useParams } from 'react-router-dom'

const ThreadPage = () => {
  const { id } = useParams()
  const { data: userInfo, isLoading: isUserLoading } = useGetUser()
  const { data: thread, isLoading: isPostLoading } = useGetSingleThread(id || '')

  if (!id) return null

  if (isUserLoading || isPostLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  if (!thread) {
    return null
  }

  return (
    <section className='relative'>
      <div>
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
      </div>

      <div className='mt-7'>
        <CommentForm threadId={thread._id} currentUserImg={userInfo.image} currentUserId={userInfo._id} />
      </div>

      <div className='mt-10'></div>
    </section>
  )
}

export default ThreadPage
