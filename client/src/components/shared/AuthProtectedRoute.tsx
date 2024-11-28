import { useGetUser } from '@/apis/UserApi'
import { Navigate } from 'react-router-dom'

const AuthProtectedRoute = ({ children }: any) => {
  const { data: userInfo, isLoading: isUserLoading } = useGetUser()

  if (isUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return children
}

export default AuthProtectedRoute
