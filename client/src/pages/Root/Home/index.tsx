import { useGetUser } from '@/apis/UserApi'
import Loader from '@/components/shared/Loader'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const { data: userInfo, isLoading } = useGetUser()

  if (!isLoaded || isLoading) {
    return (
      <div className='bg-dark-1 min-h-screen w-full flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (!isSignedIn || !user) {
    return <Navigate to='/sign-in' />
  }

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>
    </>
  )
}

export default Home
