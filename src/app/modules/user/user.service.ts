import { IUser } from './user.interface'
import userModel from './user.model'

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await userModel.find()
  return users
}

export const UserService = {
  getAllUsers,
}
