import { AccountProfileData } from '@/components/forms/AccountProfileForm'
import { Thread, User } from '@/type'
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

export const useGetUser = (clerkId?: string) => {
  const { userId: currentUserclerkId } = useAuth()

  const createGetUserRequest = async (): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${clerkId || currentUserclerkId}`)

    if (!res.ok) {
      throw new Error('Failed to get user')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', clerkId ? { clerkId } : { clerkId: currentUserclerkId }],
    queryFn: createGetUserRequest,
    enabled: clerkId ? !!clerkId : !!currentUserclerkId,
    staleTime: clerkId ? 0 : 1000 * 60 * 5 // Disable cache for other users, cache for current user
  })

  return { data, isLoading }
}

export const useGetUserPosts = (clerkId: string) => {
  const { userId: currentUserclerkId } = useAuth()

  const createGetUserPostsRequest = async (): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${clerkId}/posts`)

    if (!res.ok) {
      throw new Error('Failed to get user posts')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['userPosts', { clerkId }],
    queryFn: createGetUserPostsRequest,
    enabled: !!clerkId,
    staleTime: currentUserclerkId !== clerkId ? 0 : 1000 * 60 * 5 // Disable cache for other users, cache for current user
  })

  return { data, isLoading }
}

type GetUsersResponse = {
  users: User[]
  isNext: boolean
}

export const useGetUsers = (
  page: number = 1,
  limit: number = 20,
  searchString: string = '',
  sortBy: string = 'desc'
) => {
  const { userId: currentUserclerkId } = useAuth()

  const createGetUsersRequest = async (): Promise<GetUsersResponse> => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/users?userId=${currentUserclerkId}&page=${page}&limit=${limit}&searchString=${searchString}&sortBy=${sortBy}`
    )

    if (!res.ok) {
      throw new Error('Failed to get users')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['users', { page }, { limit }, { searchString }, { sortBy }],
    queryFn: createGetUsersRequest,
    enabled: !!currentUserclerkId,
    staleTime: 0
  })

  return { data, isLoading }
}

export const useGetUserActivities = (objectId?: string) => {
  const createGetUserActivitiesRequest = async (): Promise<Thread[]> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${objectId}/activities`)

    if (!res.ok) {
      throw new Error('Failed to get user activities')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['userActivities', { objectId }],
    queryFn: createGetUserActivitiesRequest,
    enabled: !!objectId,
    staleTime: 0 // Disable cache, always fetch the latest data
  })

  return { data, isLoading }
}
