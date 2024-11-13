export type User = {
  _id: string
  clerkId: string
  username: string
  name: string
  bio: string
  image: string
  onboarded: boolean
  threads: Thread[]
  createdAt: string
  updatedAt: string
}

export type Thread = {
  _id: string
  text: string
  author: User
  community: any // TODO: Add community type
  parentId: string
  children: Thread[]
  createdAt: string
  updatedAt: string
}

export type Community = {}
