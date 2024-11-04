import { Schema, Document, model, Types } from 'mongoose'

interface IThread extends Document {
  _id: Types.ObjectId
  text: string
  author: Types.ObjectId
  community: Types.ObjectId
  parentId: string
  children: Types.ObjectId[]
}

const threadSchema = new Schema<IThread>(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community'
    },
    parentId: {
      type: String
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
      }
    ]
  },
  { timestamps: true }
)

const Thread = model<IThread>('Thread', threadSchema)

export default Thread
