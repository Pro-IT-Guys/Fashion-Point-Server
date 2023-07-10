import { Schema, model } from 'mongoose'
import { IOffer, IOfferModel } from './offer.interface'

const offerSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    startFrom: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const offerModel = model<IOffer, IOfferModel>('Offer', offerSchema)
export default offerModel
