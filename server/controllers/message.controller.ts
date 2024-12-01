import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import Conversation from '../models/conversation.model'
import Message from '../models/message.model'
import ApiError from '../utils/ApiError'
import User from '../models/user.model'
import { getRecipientSocketId, io } from '../socket'

interface sendMessageRequest extends Request {
  body: {
    recipientId: string
    message: string
    image: string
  }
}

export const sendMessage = asyncHandler(async (req: sendMessageRequest, res: Response, next: NextFunction) => {
  const { recipientId, message, image } = req.body
  // @ts-ignore
  const { userId } = req.auth

  const sender = await User.findOne({ clerkId: userId })

  if (!sender) {
    throw new ApiError(404, 'User not found')
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [recipientId, sender._id] }
  })

  if (!conversation) {
    conversation = new Conversation({
      participants: [recipientId, sender._id],
      lastMessage: {
        text: message,
        sender: sender._id
      }
    })

    await conversation.save()
  }

  const newMessage = new Message({
    conversationId: conversation._id,
    sender: sender._id,
    text: message,
    img: image
  })

  await Promise.all([
    newMessage.save(),
    conversation.updateOne({
      lastMessage: {
        text: message,
        sender: sender._id
      }
    })
  ])

  const recipientSocketId = getRecipientSocketId(recipientId)
  const senderSocketId = getRecipientSocketId(sender._id.toString())

  if (recipientSocketId) {
    io.to(recipientSocketId).emit('newMessage', newMessage)
    io.to(recipientSocketId).emit('updateConversation', conversation)
  }

  if (senderSocketId) {
    io.to(senderSocketId).emit('newMessage', newMessage)
  }

  res.status(201).json(newMessage)
})

export const getMessages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { otherUserId } = req.params
  // @ts-ignore
  const { userId } = req.auth

  const user = await User.findOne({ clerkId: userId })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const conversation = await Conversation.findOne({
    participants: { $all: [otherUserId, user._id] }
  })

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found')
  }

  const messages = await Message.find({ conversationId: conversation._id })
    .populate({
      path: 'sender',
      model: User,
      select: '_id image name'
    })
    .sort({ createdAt: 1 })

  res.status(200).json({ messages, conversation })
})

export const getConversations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { userId } = req.auth

  const user = await User.findOne({ clerkId: userId })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const conversations = await Conversation.find({
    participants: user._id
  }).populate({
    path: 'participants',
    model: User,
    select: '_id clerkId username image'
  })

  conversations.forEach((conversation) => {
    conversation.participants = conversation.participants.filter(
      // @ts-ignore
      (participant) => participant._id.toString() !== user._id.toString()
    )
  })

  res.status(200).json(conversations)
})
