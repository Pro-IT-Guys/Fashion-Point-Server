import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { PrivacyServices } from './privacy.service'

const createPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await PrivacyServices.createPrivacyPolicy(req.body)

  const responseData = {
    message: 'Privacy Policy created successfully',
    data: result,
  }
  sendSuccessResponse(res, responseData)
})

const getPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await PrivacyServices.getPrivacyPolicy()

  const responseData = {
    message: 'Privacy Policy fetched successfully',
    data: result,
  }
  sendSuccessResponse(res, responseData)
})

export const PrivacyController = {
  createPrivacyPolicy,
  getPrivacyPolicy,
}
