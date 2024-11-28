import { useUserContext } from '@/contexts/UserContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { conversationsTabs } from '@/helpers/constants'
import ChatList from './ChatList'
import ChatSearchList from './ChatSearchList'

const ChatLeftSideBar = () => {
  const { selectedUser } = useUserContext()

  return (
    <aside className={`w-full md:w-64 border-r border-zinc-800 ${selectedUser && 'max-md:hidden'} md:block`}>
      <Tabs defaultValue='chats' className='w-full h-full'>
        <TabsList className='tab'>
          {conversationsTabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.value} className='tab'>
              <p>{tab.label}</p>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='chats' className='w-full text-light-1'>
          <ChatList />
        </TabsContent>

        <TabsContent value='users' className='w-full text-light-1'>
          <ChatSearchList />
        </TabsContent>
      </Tabs>
    </aside>
  )
}

export default ChatLeftSideBar
