import { Schema, Document, model, Types } from 'mongoose'

interface IUser extends Document {
  _id: Types.ObjectId
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

const User = model<IUser>('User', userSchema)

export default User
