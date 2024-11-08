import { useGetUser } from '@/apis/UserApi'
import Loader from '@/components/shared/Loader'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const { data: userInfo, isLoading } = useGetUser()

  if (isLoading) {
    return <Loader />
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>
    </>
  )
}

export default Home
