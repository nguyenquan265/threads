import { useGetCommunities } from '@/apis/CommunityApi'
import { useGetUsers } from '@/apis/UserApi'
import UserCard from '../cards/UserCard'
import SearchSkeleton from './SearchSkeleton'
import { useLocation } from 'react-router-dom'

const RightSidebar = () => {
  const { data: usersResult, isLoading: isGetUsersLoading } = useGetUsers('', 1)
  const { data: communitiesResult, isLoading: isGetCommunitiesLoading } = useGetCommunities('', 1)
  const location = useLocation()

  if (location.pathname.startsWith('/conversations')) {
    return null
  }

  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Suggested communities</h3>

        <div className='mt-7 flex w-[300px] flex-col gap-9'>
          {isGetCommunitiesLoading && <SearchSkeleton />}

          {communitiesResult && communitiesResult.communities.length > 0 ? (
            <>
              {communitiesResult.communities.map((community) => (
                <UserCard
                  key={community._id}
                  id={community.clerkId}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No communities yet</p>
          )}
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>

        <div className='mt-7 flex w-[300px] flex-col gap-10'>
          {isGetUsersLoading && <SearchSkeleton />}

          {usersResult && usersResult.users.length > 0 ? (
            <>
              {usersResult.users.map((person) => (
                <UserCard
                  key={person._id}
                  id={person.clerkId}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar
