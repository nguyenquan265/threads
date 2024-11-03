import Home from '@/assets/home.svg'
import Search from '@/assets/search.svg'
import Heart from '@/assets/heart.svg'
import Create from '@/assets/create.svg'
import Community from '@/assets/community.svg'
import User from '@/assets/user.svg'

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
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
  { value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' }
]

export const communityTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'members', label: 'Members', icon: '/assets/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/assets/request.svg' }
]
