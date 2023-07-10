import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { ReturnPolicyServices } from './return.service'

const createReturnPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ReturnPolicyServices.createReturnPolicy(req.body)

  const responseData = {
    message: 'Return policy created successfully',
    data: result,
  }
  sendSuccessResponse(res, responseData)
})

const getReturnPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ReturnPolicyServices.getReturnPolicy()

  const responseData = {
    message: 'Return policy fetched successfully',
    data: result,
  }
  sendSuccessResponse(res, responseData)
})

export const ReturnPolicyController = {
    createReturnPolicy,
    getReturnPolicy,
}
