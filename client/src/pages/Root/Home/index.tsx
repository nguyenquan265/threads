import { useGetPosts } from '@/apis/ThreadApi'
import { useGetUser } from '@/apis/UserApi'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import ThreadCard from '@/components/cards/ThreadCard'
import ThreadCardSkeleton from '@/components/shared/ThreadCardSkeleton'
import Pagination from '@/components/shared/Pagination'

const Home = () => {
  const [searchParams] = useSearchParams()
  const pageNumber = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const { data: userInfo, isLoading: isUserLoading } = useGetUser()
  const { data: result, isLoading: isPostsLoading } = useGetPosts(pageNumber)

  if (isUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {isPostsLoading && <ThreadCardSkeleton />}

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

      <Pagination pageNumber={pageNumber} isNext={result ? result.isNext : false} path='/' />
    </>
  )
}

export default Home
