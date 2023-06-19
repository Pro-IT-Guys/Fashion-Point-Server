import bcrypt from 'bcrypt'
import { IUser } from '../modules/user/user.interface'

const checkPassword = async (
  password: string,
  user: IUser
): Promise<boolean> => {
  const hashedPassword = user.password

  // Compare the provided password with the hashed password using bcrypt's compare function
  const passwordMatch = await bcrypt.compare(password, hashedPassword)

  return passwordMatch
}

export default checkPassword
