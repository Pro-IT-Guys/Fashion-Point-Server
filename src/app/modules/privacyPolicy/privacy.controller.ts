import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { PrivacyServices } from './privacy.service'

const createPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await PrivacyServices.createPrivacyService(req.body)

  const responseData = {
    message: 'Privacy Policy created successfully',
    data: result,
  }
  sendSuccessResponse(res, responseData)
})

export const PrivacyController = {
  createPrivacyPolicy,
}
