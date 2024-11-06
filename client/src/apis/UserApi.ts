import { AccountProfileData } from '@/components/forms/AccountProfileForm'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from 'react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useUpdateUser = () => {
  const { getToken, userId } = useAuth()

  const createUpdateUserRequest = async (userData: AccountProfileData): Promise<string> => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    })

    if (!res.ok) {
      throw new Error('Failed to update user')
    }

    return res.json()
  }

  const { mutateAsync: updateUser, isLoading, isError, error } = useMutation(createUpdateUserRequest)

  if (isError) {
    console.error(error)
  }

  return { updateUser, isLoading }
}
