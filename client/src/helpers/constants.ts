import Home from '@/assets/home.svg'
import Search from '@/assets/search.svg'
import Heart from '@/assets/heart.svg'
import Create from '@/assets/create.svg'
import Community from '@/assets/community.svg'
import User from '@/assets/user.svg'
import Reply from '@/assets/reply.svg'
import Members from '@/assets/members.svg'
import Tag from '@/assets/tag.svg'
import Requests from '@/assets/request.svg'

export const sidebarLinks = [
  {
    imgURL: Home,
    route: '/',
    label: 'Home'
  },
  {
    imgURL: Search,
    route: '/search',
    label: 'Search'
  },
  {
    imgURL: Heart,
    route: '/activity',
    label: 'Activity'
  },
  {
    imgURL: Create,
    route: '/create-thread',
    label: 'Create Thread'
  },
  {
    imgURL: Community,
    route: '/communities',
    label: 'Communities'
  },
  {
    imgURL: User,
    route: '/profile',
    label: 'Profile'
  }
]

export const profileTabs = [
  { value: 'threads', label: 'Threads', icon: Reply },
  { value: 'replies', label: 'Replies', icon: Members },
  { value: 'tagged', label: 'Tagged', icon: Tag }
]

export const communityTabs = [
  { value: 'threads', label: 'Threads', icon: Reply },
  { value: 'members', label: 'Members', icon: Members },
  { value: 'requests', label: 'Requests', icon: Requests }
]
