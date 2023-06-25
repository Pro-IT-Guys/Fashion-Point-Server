/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface ICity {
  city_name: string
  delivery_fee?: number
}

export interface IState {
  state_name: string
  cities?: ICity[]
  delivery_fee?: number
}

export interface ICountry {
  country: string
  country_code: string
  phoneCode: string
  states: IState[]
}

export interface IDeliveryFeeModel extends Model<ICountry> {
  getProductById(id: string): Promise<ICountry>
}
