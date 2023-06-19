import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthService } from './auth.service'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.signupUser(userData)

  const { accessToken, data } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({ message: 'User registered successfully', data })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.loginUser(userData)

  const { accessToken, data } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({ message: 'User logged in successfully', data })
})

export const AuthController = {
  signupUser,
  loginUser,
}
