import http from 'http'
import { Server } from 'socket.io'
import app from './app'

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

const userSocketMap = new Map<string, string>()

const getRecipientSocketId = (recipientId: string) => {
  return userSocketMap.get(recipientId)
}

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  const userId = socket.handshake.query.userId as string
  if (userId != 'undefined') userSocketMap.set(userId, socket.id)

  console.log(userSocketMap)

  io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId)
        break
      }
    }
  })
})

export { io, server, getRecipientSocketId }
