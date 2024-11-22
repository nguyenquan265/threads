import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import Conversation from '../models/conversation.model'
import Message from '../models/message.model'
import ApiError from '../utils/ApiError'
import User from '../models/user.model'

export const sendMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
  const { userId } = req.body

  const conversation = await Conversation.findOne({
    participants: { $all: [otherUserId, userId] }
  })

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found')
  }

  const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 })

  res.status(200).json(messages)
})

export const getConversations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body

  const conversations = await Conversation.find({
    participants: userId
  }).populate({
    path: 'participants',
    model: User,
    select: '_id clerkid username image'
  })

  conversations.forEach((conversation) => {
    conversation.participants = conversation.participants.filter(
      (participant: { _id: string }) => participant._id.toString() !== userId
    )
  })

  res.status(200).json(conversations)
})
