import { Navigate } from 'react-router-dom'
import { useGetUser } from '@/apis/UserApi'
import ChatLeftSideBar from '@/components/shared/ChatLeftSideBar'
import ChatHeader from '@/components/shared/ChatHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatContent from '@/components/shared/ChatContent'
import ChatInput from '@/components/forms/ChatInput'
import { useUserContext } from '@/contexts/UserContext'

const ConversationsPage = () => {
  const { selectedUser } = useUserContext()
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
        <ChatLeftSideBar />

        {selectedUser && (
          <div className='flex-1 flex flex-col'>
            <ChatHeader />

            <ScrollArea className='flex-1 p-4 max-md:max-h-[calc(100vh-73px-73px-8rem-7rem-4px)] max-h-[calc(100vh-73px-73px-2.5rem-7rem-4px)]'>
              <ChatContent currentUser={userInfo} />
            </ScrollArea>

            <ChatInput />
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationsPage
