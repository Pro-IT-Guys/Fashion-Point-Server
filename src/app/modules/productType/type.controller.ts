import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { TypeService } from './type.service'

const createType = catchAsync(async (req: Request, res: Response) => {
  const type = await TypeService.createType(req.body)

  const responseData = {
    message: 'Product type created successfully',
    data: type,
  }
  sendSuccessResponse(res, responseData)
})

export const TypeController = {
  createType,
}
