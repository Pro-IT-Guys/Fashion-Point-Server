import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { UserService } from './user.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IUser } from './user.interface'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await UserService.createUser(userData)

  const responseData = {
    data: user,
    message: 'User created successfully',
  }
  sendSuccessResponse<IUser>(res, responseData)
})

export const UserController = {
  createUser,
}
