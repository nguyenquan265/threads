import { useGetUser } from '@/apis/UserApi'
import { Navigate } from 'react-router-dom'

const CommunitiesPage = () => {
  const { data: userInfo, isLoading } = useGetUser()

  if (isLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <section>
      <h1 className='head-text mb-10'>Communities</h1>
    </section>
  )
}

export default CommunitiesPage
