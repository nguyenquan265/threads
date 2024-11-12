import { useGetPosts } from '@/apis/ThreadApi'
import { useGetUser } from '@/apis/UserApi'
import ThreadCard from '@/components/cards/ThreadCard'
// import Loader from '@/components/shared/Loader'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const { data: userInfo, isLoading: isUserLoading } = useGetUser()
  const { data: result, isLoading: isPostsLoading } = useGetPosts()

  if (isUserLoading || isPostsLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result?.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result?.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={userInfo.clerkId}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}

export default Home
