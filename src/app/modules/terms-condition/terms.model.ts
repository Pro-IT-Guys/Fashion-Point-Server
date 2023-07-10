import { Schema, model } from 'mongoose'
import { ITerms, ITermsModel } from './terms.interface'

const termsSchema = new Schema<ITerms>({
  content: {
    type: String,
    required: true,
  },
})

const termsModel = model<ITerms, ITermsModel>(`Terms`, termsSchema)
export default termsModel
