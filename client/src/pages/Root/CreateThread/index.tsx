import { useGetUser } from '@/apis/UserApi'
import PostThreadForm from '@/components/forms/PostThreadForm'
import { Navigate } from 'react-router-dom'

const CreateThreadPage = () => {
  const { data: userInfo, isLoading } = useGetUser()

  if (isLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <PostThreadForm userObjectId={userInfo._id} />
    </>
  )
}

export default CreateThreadPage
