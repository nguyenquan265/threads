import { useEffect, useState } from 'react'
import ChatCard from '../cards/ChatCard'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { useGetUsers } from '@/apis/UserApi'
import { useUserContext } from '@/contexts/UserContext'
import SearchIcon from '@/assets/search-gray.svg'

const ChatSearchList = () => {
  const { setSelectedUser } = useUserContext()
  const [searchString, setSearchString] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(searchString)
  const { data: result, isLoading: isGetUsersListLoading } = useGetUsers(debouncedSearch, 1, 10)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchString)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchString])

  return (
    <>
      <div className='p-4 border-b border-zinc-800 flex-1'>
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

      <ScrollArea className='max-md:h-[calc(100vh-8rem-7rem-4px-50px-89px-0.5rem)] md:h-[calc(100vh-2.5rem-7rem-4px-50px-89px-0.5rem)]'>
        {isGetUsersListLoading && <p className='text-light-1 flex justify-center mt-3'>Loading users...</p>}

        {result && result.users.length > 0 ? (
          <>
            {result.users.map((user) => (
              <ChatCard key={user._id} user={user} setSelectedUser={() => setSelectedUser(user)} />
            ))}
          </>
        ) : (
          <p className='text-light-1 flex justify-center mt-3'>No users found</p>
        )}
      </ScrollArea>
    </>
  )
}

export default ChatSearchList
