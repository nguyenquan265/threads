import { useGetUser } from '@/apis/UserApi'
import PostThreadForm from '@/components/forms/PostThreadForm'
import Loader from '@/components/shared/Loader'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

const CreateThreadPage = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const { data: userInfo, isLoading } = useGetUser(user ? user.id : '')

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

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <PostThreadForm userId={userInfo._id} />
    </>
  )
}

export default CreateThreadPage
