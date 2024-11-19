import { Community } from '@/type'
import { useQuery } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetCommunityDetails = (communityClerkId?: string) => {
  const createGetCommunityDetailsRequest = async (): Promise<Community> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/communities/${communityClerkId}`)

    if (!res.ok) {
      throw new Error('Failed to get community details')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['communityDetails', { clerkId: communityClerkId }],
    queryFn: createGetCommunityDetailsRequest,
    enabled: !!communityClerkId,
    staleTime: 0
  })

  return { data, isLoading }
}

export const useGetCommunityPosts = (communityClerkId?: string) => {
  const createGetCommunityPostsRequest = async (): Promise<Community> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/communities/${communityClerkId}/posts`)

    if (!res.ok) {
      throw new Error('Failed to get community posts')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['communityPosts', { clerkId: communityClerkId }],
    queryFn: createGetCommunityPostsRequest,
    enabled: !!communityClerkId,
    staleTime: 0
  })

  return { data, isLoading }
}

type GetCommunitiesResponse = {
  communities: Community[]
  isNext: boolean
}

export const useGetCommunities = (
  searchString: string = '',
  page: number = 1,
  limit: number = 2,
  sortby: string = 'desc'
) => {
  const createGetCommunitiesRequest = async (): Promise<GetCommunitiesResponse> => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/communities?page=${page}&limit=${limit}&searchString=${searchString}&sortby=${sortby}`
    )

    if (!res.ok) {
      throw new Error('Failed to get communities')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['communities', { page }, { limit }, { searchString }, { sortby }],
    queryFn: createGetCommunitiesRequest,
    staleTime: 0
  })

  return { data, isLoading }
}
