export type User = {
  _id: string
  clerkId: string
  username: string
  name: string
  bio: string
  image: string
  onboarded: boolean
  threads: Thread[]
  communities: Community[]
  createdAt: string
  updatedAt: string
}

export type Thread = {
  _id: string
  text: string
  author: User
  community: Community
  parentId: string
  children: Thread[]
  createdAt: string
  updatedAt: string
}

export type Community = {
  _id: string
  clerkId: string
  username: string
  name: string
  image: string
  bio: string
  createdBy: User
  members: User[]
  threads: Thread[]
  createdAt: string
  updatedAt: string
}

export type Conversation = {
  _id: string
  participants: User[]
  lastMessage: {
    text: string
    sender: string
    seen: boolean
  }
  createdAt: string
  updatedAt: string
}

export type Message = {
  _id: string
  conversationId: string
  sender: User
  text: string
  seen: boolean
  img: string
  createdAt: string
  updatedAt: string
}
