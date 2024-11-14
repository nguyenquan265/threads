import { useGetUser } from '@/apis/UserApi'
import { Navigate } from 'react-router-dom'

const SearchPage = () => {
  const { data: userInfo, isLoading } = useGetUser()

  if (isLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
    </section>
  )
}

export default SearchPage
