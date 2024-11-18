import { useGetUser, useGetUsers } from '@/apis/UserApi'
import UserCard from '@/components/cards/UserCard'
import SearchSkeleton from '@/components/shared/SearchSkeleton'
import { Navigate } from 'react-router-dom'

const SearchPage = () => {
  const { data: userInfo, isLoading: isGetUserLoading } = useGetUser()
  const { data: result, isLoading: isGetUsersListLoading } = useGetUsers(1, 20, '')

  if (isGetUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      {/* TODO: SearchBar */}

      <div className='mt-14 flex flex-col gap-9'>
        {isGetUsersListLoading && <SearchSkeleton />}

        {result?.users.length == 0 ? (
          <p className='no-result'>No users found</p>
        ) : (
          <>
            {result?.users.map((person) => (
              <UserCard
                key={person.clerkId}
                id={person.clerkId}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      {/* TODO: Pagination */}
    </section>
  )
}

export default SearchPage
