import hashPassword from '../../helpers/hashPassword'
import { IUser } from '../user/user.interface'
import userModel from '../user/user.model'

const signupUser = async (userData: IUser): Promise<IUser> => {
  const { password, ...rest } = userData
  const hashedPassword = await hashPassword(password)
  const user = await userModel.create({ password: hashedPassword, ...rest })
  return user
}

export const AuthService = {
  createUser: signupUser,
}
