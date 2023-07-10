import { Schema, model } from 'mongoose'
import { IPrivacy, IPrivacyModel } from './privacy.interface'

const privacySchema = new Schema<IPrivacy>({
  content: {
    type: String,
    required: true,
  },
})

const privacyModel = model<IPrivacy, IPrivacyModel>(`Privacy`, privacySchema)
export default privacyModel
