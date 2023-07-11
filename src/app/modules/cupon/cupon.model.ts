import { Schema, model } from 'mongoose'
import { ICupon, ICuponModel } from './cupon.interface'

const cuponSchema = new Schema<ICupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    usedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    expireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const cuponModel = model<ICupon, ICuponModel>('Cupon', cuponSchema)
export default cuponModel
