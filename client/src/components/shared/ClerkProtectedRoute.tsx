import Loader from '@/components/shared/Loader'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

const ClerkProtectedRoute = ({ children }: any) => {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <Loader />
  }

  if (!isSignedIn) {
    return <Navigate to='/sign-in' />
  }

  return children
}

export default ClerkProtectedRoute
