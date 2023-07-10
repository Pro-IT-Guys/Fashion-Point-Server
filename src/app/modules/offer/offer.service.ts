import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAddId, IOffer } from './offer.interface'
import offerModel from './offer.model'
import mongoose from 'mongoose'

import productModel from '../product/product.model'
import { scheduleCronJobs } from '../../helpers/cornJobs'

const createOffer = async (offerData: IOffer): Promise<IOffer> => {
  const { startFrom, endAt } = offerData

  const existingOffer = await offerModel.findOne({
    $or: [
      { startFrom: { $gte: startFrom, $lte: endAt } },
      { endAt: { $gte: startFrom, $lte: endAt } },
      {
        $and: [{ startFrom: { $lte: startFrom } }, { endAt: { $gte: endAt } }],
      },
    ],
  })

  if (existingOffer) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'An offer already exists within the specified date range'
    )
  }

  const checkAnyOfferExists = await offerModel.findOne({})
  if (checkAnyOfferExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'An offer already exists, please delete it first'
    )
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const createdOfferArray = await offerModel.create([offerData], { session })
    const offer: IAddId = createdOfferArray[0].toObject()

    if (!offer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create offer')
    }

    const updatedProducts = await productModel.updateMany(
      { _id: { $in: offer.product } },
      { $set: { discountPrice: offer.discountPrice, isVisible: true } }
    )

    if (updatedProducts.modifiedCount <= 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Unable to update product prices'
      )
    }

    await session.commitTransaction()
    session.endSession()

    // Schedule cron jobs after the offer has been created and the transaction committed
    scheduleCronJobs(offer)

    return offer
  } catch (error) {
    session.endSession()
    throw error
  }
}

const getOffer = async (): Promise<IOffer> => {
  const offer = await offerModel.findOne({})
  if (!offer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found')
  }
  return offer
}

const deleteOfferById = async (id: string): Promise<IOffer> => {
  const offer = await offerModel.findByIdAndDelete(id)
  if (!offer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found')
  }
  return offer
}

export const offerService = {
  createOffer,
  getOffer,
  deleteOfferById,
}
