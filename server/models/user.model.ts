import { Schema, Document, model, Types, models } from 'mongoose'

export interface IUser extends Document {
  _id: Types.ObjectId
  clerkId: string
  username: string
  name: string
  image: string
  bio: string
  threads: Types.ObjectId[]
  onboarded: boolean
  communities: Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      unique: true,
      required: true
    },
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
    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
      }
    ],
    onboarded: {
      type: Boolean,
      default: false
    },
    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Community'
      }
    ]
  },
  { timestamps: true }
)

const User = models.User || model<IUser>('User', userSchema)

export default User
