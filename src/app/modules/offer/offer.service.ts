// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
// import { IOffer } from './offer.interface'
// import offerModel from './offer.model'
// import mongoose from 'mongoose'

// import cron from 'node-cron'
// import productModel from '../product/product.model'

// const createOffer = async (offerData: IOffer): Promise<IOffer> => {
//   const { startFrom, endAt } = offerData

//   const existingOffer = await offerModel.findOne({
//     $or: [
//       { startFrom: { $gte: startFrom, $lte: endAt } },
//       { endAt: { $gte: startFrom, $lte: endAt } },
//       {
//         $and: [{ startFrom: { $lte: startFrom } }, { endAt: { $gte: endAt } }],
//       },
//     ],
//   })

//   if (existingOffer) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       'An offer already exists within the specified date range'
//     )
//   }

//   const session = await mongoose.startSession()
//   session.startTransaction()

//   try {
//     const offer = await offerModel.create(offerData, { session })

//     if (!offer) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create offer')
//     }

//     const updatedProducts = await productModel.updateMany(
//       { _id: { $in: offer.product } },
//       { $set: { price: offer.discountPrice, isVisible: true } }
//     )

//     if (updatedProducts.nModified <= 0) {
//       throw new ApiError(
//         httpStatus.BAD_REQUEST,
//         'Unable to update product prices'
//       )
//     }

//     await session.commitTransaction()
//     await session.endSession()

//     cron.schedule(endAt.toString(), async () => {
//       const originalProducts = await productModel.updateMany(
//         { _id: { $in: offer.product } },
//         { $set: { price: '$originalPrice', isVisible: false } }
//       )

//       if (originalProducts.nModified <= 0) {
//         console.error('Failed to restore original product prices.')
//       }
//     })

//     cron.schedule(startFrom.toString(), async () => {
//       const updatedProducts = await productModel.updateMany(
//         { _id: { $in: offer.product } },
//         { $set: { price: offer.discount, isVisible: true } }
//       )

//       if (updatedProducts.nModified <= 0) {
//         console.error('Failed to update product prices.')
//       }
//     })

//     return offer
//   } catch (error) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create offer')
//   }
// }

// export const offerService = {
//   createOffer,
// }
