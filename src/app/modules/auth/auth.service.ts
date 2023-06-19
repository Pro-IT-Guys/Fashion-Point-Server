import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import hashPassword from '../../helpers/hashPassword'
import { IUser } from '../user/user.interface'
import userModel from '../user/user.model'
import checkPassword from '../../helpers/checkPassword'
import config from '../../../config'
import { IJwtPayload, IUserResponse } from './auth.interface'
import generateRandomCode from '../../../shared/generateRandomCode'
import sendEmail from '../../helpers/sendEmail'

const signupUser = async (userData: IUser): Promise<IUserResponse> => {
  const { password, ...rest } = userData
  const { email } = userData
  const accessToken = jwt.sign({ email }, config.access_token as string, {
    expiresIn: '1d',
  })

  const verificationCode = generateRandomCode()
  const codeGenerationTimestamp = Date.now()
  const codeSent = sendEmail(email, 'subject', verificationCode)

  if (!codeSent)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code could not be sent')

  const hashedPassword = await hashPassword(password)
  const user = await userModel.create({
    password: hashedPassword,
    ...rest,
    codeGenerationTimestamp: codeGenerationTimestamp,
    verificationCode,
  })
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed')

  return { accessToken, data: { role: user.role } }
}

const loginUser = async (userData: IUser): Promise<IUserResponse> => {
  const { password, email } = userData

  const user = await userModel.findOne({ email })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const passwordMatch = await checkPassword(password, user)
  if (!passwordMatch)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password')

  const accessToken = jwt.sign({ email }, config.access_token as string, {
    expiresIn: '1d',
  })
  return { accessToken, data: { role: user.role } }
}

const loggedInUser = async (token: string): Promise<IUser> => {
  const decodedToken = jwt.verify(
    token,
    config.access_token as string
  ) as IJwtPayload

  const email = decodedToken.email
  const user = await userModel
    .findOne({ email })
    .select({ password: 0, updatedAt: 0, createdAt: 0, __v: 0 })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  return user
}

export const AuthService = {
  signupUser,
  loginUser,
  loggedInUser,
}
