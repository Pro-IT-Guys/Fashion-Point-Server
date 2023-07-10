import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { TermsConditionService } from './terms.service'

const createTermsCondition = catchAsync(async (req: Request, res: Response) => {
  const result = await TermsConditionService.createTermsConditionService(
    req.body
  )

  const responseData = {
    message: 'Terms and Condition created successfully',
    data: result,
  }
  sendSuccessResponse(res, responseData)
})

export const TermsConditionController = {
  createTermsCondition,
}
