import { AccountProfileData } from '@/components/forms/AccountProfileForm'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type User = {
  _id: string
  clerkId: string
  username: string
  name: string
  bio: string
  image: string
  onboarded: boolean
}

export const useUpdateUser = () => {
  const { getToken, userId: clerkId } = useAuth()

  const createUpdateUserRequest = async (userData: AccountProfileData): Promise<User> => {
    const token = await getToken()

    const res = await fetch(`${API_BASE_URL}/api/v1/users/${clerkId}`, {
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

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: createUpdateUserRequest
  })

  return { updateUser, isPending }
}

export const useGetUser = () => {
  const { userId: clerkId } = useAuth()

  const createGetUserRequest = async (): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${clerkId}`)

    if (!res.ok) {
      throw new Error('Failed to get user')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', clerkId],
    queryFn: createGetUserRequest,
    enabled: !!clerkId
  })

  return { data, isLoading }
}
