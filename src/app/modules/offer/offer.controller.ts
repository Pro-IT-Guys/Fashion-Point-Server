import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { offerService } from './offer.service'

const createOffer = catchAsync(async (req: Request, res: Response) => {
  const offerData = req.body
  const offer = await offerService.createOffer(offerData)
  const responseData = {
    data: offer,
    message: 'Offer created successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getOfferById = catchAsync(async (req: Request, res: Response) => {
  const offerId = req.params.id
  const offer = await offerService.getOfferById(offerId)
  const responseData = {
    data: offer,
    message: 'Offer fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const offerController = {
  createOffer,
  getOfferById,
}
