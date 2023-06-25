import { Schema, model } from 'mongoose'
import {
  ICity,
  ICountry,
  IDeliveryFeeModel,
  IState,
} from './deliveryFee.interface'

const citySchema = new Schema<ICity>(
  {
    city_name: {
      type: String,
      required: true,
    },
    delivery_fee: {
      type: Number,
    },
  },
  { _id: false }
)

const stateSchema = new Schema<IState>(
  {
    state_name: {
      type: String,
      required: true,
    },
    cities: [citySchema],
    delivery_fee: {
      type: Number,
    },
  },
  { _id: false }
)

const countrySchema = new Schema<ICountry>({
  country: {
    type: String,
    required: true,
    unique: true,
  },
  country_code: {
    type: String,
    required: true,
    unique: true,
  },
  phoneCode: {
    type: String,
    required: true,
  },
  states: [stateSchema],
})

const deliveryFeeModel = model<ICountry, IDeliveryFeeModel>(
  'DeliveryFee',
  countrySchema
)

export default deliveryFeeModel
