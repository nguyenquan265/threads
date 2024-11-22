import { Schema, Document, model, Types, models } from 'mongoose'

interface IConversation extends Document {
  _id: Types.ObjectId
  participants: Types.ObjectId[]
  lastMessage: {
    text: string
    sender: Types.ObjectId
    seen: boolean
  }
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {
      text: String,
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      seen: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
)

const Conversation = models.Community || model<IConversation>('Community', conversationSchema)

export default Conversation
