import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import Conversation from '../models/conversation.model'
import Message from '../models/message.model'
import ApiError from '../utils/ApiError'
import User from '../models/user.model'

interface sendMessageRequest extends Request {
  body: {
    recipientId: string
    senderId: string
    message: string
  }
}

export const sendMessage = asyncHandler(async (req: sendMessageRequest, res: Response, next: NextFunction) => {
  const { recipientId, senderId, message } = req.body

  let conversation = await Conversation.findOne({
    participants: { $all: [recipientId, senderId] }
  })

  if (!conversation) {
    conversation = new Conversation({
      participants: [recipientId, senderId],
      lastMessage: {
        text: message,
        sender: senderId
      }
    })

    await conversation.save()
  }

  const newMessage = new Message({
    conversationId: conversation._id,
    sender: senderId,
    text: message
  })

  await Promise.all([
    newMessage.save(),
    conversation.updateOne({
      lastMessage: {
        text: message,
        sender: senderId
      }
    })
  ])

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

  const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 })

  res.status(200).json(messages)
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
      (participant: { _id: string }) => participant._id.toString() !== userId
    )
  })

  res.status(200).json(conversations)
})
