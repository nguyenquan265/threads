import { useGetConversations } from '@/apis/MessageApi'
import { useEffect, useState, useMemo } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { useGetUsers } from '@/apis/UserApi'
import SearchIcon from '@/assets/search-gray.svg'
import { Input } from '../ui/input'
import { User } from '@/type'
import ChatCard from '../cards/ChatCard'

type Props = {
  setSelectedUser: (user: User) => void
  selectedUser?: User
}

const TestChatLeftSideBar = ({ setSelectedUser, selectedUser }: Props) => {
  const [page, setPage] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(searchString)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchString)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchString])

  const { data: result, isLoading: isGetUsersListLoading } = useGetUsers(debouncedSearch, page, 2)
  const { data: userConversations, isLoading: isGetUserConversations } = useGetConversations()

  const filteredConversations = useMemo(() => {
    if (!debouncedSearch && userConversations) {
      return userConversations.map((conversation) => {
        const otherUser = conversation.participants[0]

        return (
          <ChatCard
            key={conversation._id}
            user={otherUser}
            text={conversation.lastMessage.text}
            setSelectedUser={() => setSelectedUser(otherUser)}
          />
        )
      })
    }
    return null
  }, [debouncedSearch, userConversations, setSelectedUser])

  return (
    <aside
      className={`w-full md:w-64 border-r border-zinc-800 flex-shrink-0 ${selectedUser && 'max-md:hidden'} md:block`}
    >
      <div className='p-4 border-b border-zinc-800'>
        <div className='searchbar'>
          <img src={SearchIcon} alt='search' width={24} height={24} className='object-contain' />

          <Input
            id='text'
            value={searchString}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)}
            placeholder='Search users'
            className='no-focus searchbar_input'
          />
        </div>
      </div>

      <ScrollArea>
        {isGetUserConversations && (
          <div className='text-light-1 flex justify-center mt-3'>Loading conversations...</div>
        )}

        {filteredConversations}

        {isGetUsersListLoading && <p className='text-light-1 flex justify-center mt-3'>Loading users...</p>}

        {userConversations?.length == 0 && result && result.users.length > 0 && (
          <>
            {result.users.map((user) => (
              <ChatCard key={user._id} user={user} setSelectedUser={() => setSelectedUser(user)} />
            ))}
          </>
        )}
      </ScrollArea>
    </aside>
  )
}

export default TestChatLeftSideBar
