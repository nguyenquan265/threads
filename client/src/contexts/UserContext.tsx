import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '@/type'

type UserContextType = {
  selectedUser: User | undefined
  setSelectedUser: (user: User | undefined) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

  return <UserContext.Provider value={{ selectedUser, setSelectedUser }}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
