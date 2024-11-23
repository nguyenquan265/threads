import { useGetUser, useGetUsers } from '@/apis/UserApi'
import UserCard from '@/components/cards/UserCard'
import Pagination from '@/components/shared/Pagination'
import SearchBar from '@/components/shared/SearchBar'
import SearchSkeleton from '@/components/shared/SearchSkeleton'
import { Navigate, useSearchParams } from 'react-router-dom'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const pageNumber = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const searchQuery = searchParams.get('q') ? String(searchParams.get('q')) : ''
  const { data: userInfo, isLoading: isGetUserLoading } = useGetUser()
  const { data: result, isLoading: isGetUsersListLoading } = useGetUsers(searchQuery, pageNumber)

  if (isGetUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <SearchBar path='/search' text='Search creators' />

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

      <Pagination pageNumber={pageNumber} isNext={result ? result.isNext : false} path='/search' />
    </section>
  )
}

export default SearchPage
