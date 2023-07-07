/* eslint-disable no-console */
import cron from 'node-cron'
import productModel from '../modules/product/product.model'
import { IAddId } from '../modules/offer/offer.interface'
import offerModel from '../modules/offer/offer.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

// Define the cron jobs
export const scheduleCronJobs = (offer: Partial<IAddId>) => {
  const { startFrom, endAt, _id } = offer

  if (startFrom && endAt) {
    const startFromCronExpression = getCronExpression(startFrom)
    const endAtCronExpression = getCronExpression(endAt)

    cron.schedule(endAtCronExpression, async () => {
      try {
        const originalProducts = await productModel.updateMany(
          { _id: { $in: offer.product } },
          { $set: { discountPrice: 0, isVisibleOffer: false } }
        )

        if (originalProducts.modifiedCount <= 0) {
          console.error('Failed to restore original product prices.')
        }
      } catch (error) {
        console.error('Error restoring original product prices:', error)
      }
    })

    cron.schedule(startFromCronExpression, async () => {
      try {
        const updatedProducts = await productModel.updateMany(
          { _id: { $in: offer.product } },
          { $set: { isVisibleOffer: true } }
        )

        const updateOffer = await offerModel.findByIdAndUpdate(
          _id,
          { $set: { isVisible: true } },
          { new: true }
        )

        if (!updateOffer) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found')
        }
        console.log(updateOffer)

        if (updatedProducts.modifiedCount <= 0) {
          console.error('Failed to update product prices.')
        }
      } catch (error) {
        console.error('Error updating product prices:', error)
      }
    })
  }
}

// Helper function to convert a Date object to a cron expression
const getCronExpression = (date: Date): string => {
  const second = date.getSeconds()
  const minute = date.getMinutes()
  const hour = date.getHours()
  const dayOfMonth = date.getDate()
  const month = date.getMonth() + 1 // Note: Months are zero-based
  const dayOfWeek = date.getDay()

  return `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
}
