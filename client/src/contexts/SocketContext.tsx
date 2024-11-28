import { useGetUser } from '@/apis/UserApi'
import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null
  setSocket: (socket: Socket) => void
  onlineUsers: string[]
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useGetUser()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
      query: {
        userId: user?._id
      }
    })

    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket?.id)
    })

    newSocket.on('getOnlineUsers', (onlineUsers: string[]) => {
      setOnlineUsers(onlineUsers)
    })

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  return <SocketContext.Provider value={{ socket, setSocket, onlineUsers }}>{children}</SocketContext.Provider>
}

export const useSocketContext = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }

  return context
}
