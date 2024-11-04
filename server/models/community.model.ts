import { Schema, Document, model, Types, models } from 'mongoose'

interface ICommunity extends Document {
  _id: Types.ObjectId
  username: string
  name: string
  image: string
  bio: string
  createdBy: Types.ObjectId
  threads: Types.ObjectId[]
  members: Types.ObjectId[]
}

const communitySchema = new Schema<ICommunity>(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: String,
    bio: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
      }
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
)

const Community = models.Community || model<ICommunity>('Community', communitySchema)

export default Community
