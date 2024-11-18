import { useGetCommunities } from '@/apis/CommunityApi'
import { useGetUser } from '@/apis/UserApi'
import CommunityCard from '@/components/cards/CommunityCard'
import CommunityCardSkeleton from '@/components/shared/CommunityCardSkeleton'
import { Navigate } from 'react-router-dom'

const CommunitiesPage = () => {
  const { data: userInfo, isLoading: isGetUserLoading } = useGetUser()
  const { data: result, isLoading: isGetCommunitiesLoading } = useGetCommunities(1, 20, '')

  if (isGetUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      {/* TODO: SearchBar */}

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

      {/* TODO: Pagination */}
    </>
  )
}

export default CommunitiesPage
