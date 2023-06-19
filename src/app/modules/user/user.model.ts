import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import { USER_ROLE_ARRAY } from './user.constant'

const nameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
  },
  { _id: false }
)

const userSchema = new Schema<IUser>({
  name: nameSchema,
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: USER_ROLE_ARRAY,
    required: true,
  },
  address: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
})

const userModel = model<IUser, IUserModel>('User', userSchema)
export default userModel
