import { AccountProfileData } from '@/components/forms/AccountProfileForm'
import { User } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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

export const useGetUser = (id?: string) => {
  const { userId: currentUserclerkId } = useAuth()

  const createGetUserRequest = async (): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${id || currentUserclerkId}`)

    if (!res.ok) {
      throw new Error('Failed to get user')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', id || currentUserclerkId],
    queryFn: createGetUserRequest,
    enabled: id ? !!id : !!currentUserclerkId
  })

  return { data, isLoading }
}

export const useGetUserPosts = (id: string) => {
  const createGetUserPostsRequest = async (): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${id}/posts`)

    if (!res.ok) {
      throw new Error('Failed to get user posts')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['userPosts', id],
    queryFn: createGetUserPostsRequest,
    enabled: !!id
  })

  return { data, isLoading }
}
