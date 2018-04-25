import { Schema, model, Document } from 'mongoose'

export interface UserModel extends Document {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
}

const userSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<UserModel>('User', userSchema)
