import { useGetCommunities } from '@/apis/CommunityApi'
import { useGetUser } from '@/apis/UserApi'
import CommunityCard from '@/components/cards/CommunityCard'
import CommunityCardSkeleton from '@/components/shared/CommunityCardSkeleton'
import Pagination from '@/components/shared/Pagination'
import SearchBar from '@/components/shared/SearchBar'
import { Navigate, useSearchParams } from 'react-router-dom'

const CommunitiesPage = () => {
  const [searchParams] = useSearchParams()
  const pageNumber = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const searchQuery = searchParams.get('q') ? String(searchParams.get('q')) : ''
  const { data: userInfo, isLoading: isGetUserLoading } = useGetUser()
  const { data: result, isLoading: isGetCommunitiesLoading } = useGetCommunities(searchQuery, pageNumber)

  if (isGetUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text mb-10'>Communities</h1>

      <SearchBar path='/communities' />

      <section className='mt-9 flex flex-wrap gap-4'>
        {isGetCommunitiesLoading && <CommunityCardSkeleton />}

        {result?.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result?.communities.map((community) => (
              <CommunityCard
                key={community._id}
                id={community.clerkId}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination pageNumber={pageNumber} isNext={result ? result.isNext : false} path='/communities' />
    </>
  )
}

export default CommunitiesPage
