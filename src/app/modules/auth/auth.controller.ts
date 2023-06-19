import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { AuthService } from './auth.service'
import { IUser } from '../user/user.interface'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.createUser(userData)

  const responseData = {
    data: user,
    message: 'User created successfully',
  }
  sendSuccessResponse<IUser>(res, responseData)
})

export const AuthController = {
  signupUser,
}
