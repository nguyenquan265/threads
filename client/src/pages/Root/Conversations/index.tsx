import { Navigate } from 'react-router-dom'
import { useGetUser } from '@/apis/UserApi'
// import ChatLeftSideBar from '@/components/shared/ChatLeftSideBar'
import ChatBox from '@/components/shared/ChatBox'
import { useState } from 'react'
import { User } from '@/type'
import TestChatLeftSideBar from '@/components/shared/TestChatLeftSideBar'

const ConversationsPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const { data: userInfo, isLoading: isUserLoading } = useGetUser()

  if (isUserLoading) {
    return null
  }

  if (!userInfo?.onboarded) {
    return <Navigate to='/onboarding' />
  }

  return (
    <div className='flex flex-col bg-dark-2 border-2 border-zinc-900 text-light-1 h-full'>
      <div className='flex flex-1 overflow-hidden'>
        {/* <ChatLeftSideBar setSelectedUser={setSelectedUser} selectedUser={selectedUser} /> */}
        <TestChatLeftSideBar setSelectedUser={setSelectedUser} selectedUser={selectedUser} />

        <ChatBox setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default ConversationsPage
