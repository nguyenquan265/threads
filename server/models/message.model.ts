import { Schema, Document, model, Types, models } from 'mongoose'

interface IMessage extends Document {
  _id: Types.ObjectId
  conversationId: Types.ObjectId
  sender: Types.ObjectId
  text: string
  seen: boolean
  img: string
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    seen: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

const Message = models.Community || model<IMessage>('Community', messageSchema)

export default Message
