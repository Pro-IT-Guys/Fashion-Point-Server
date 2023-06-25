/* eslint-disable @typescript-eslint/no-explicit-any */
import { State, City } from 'country-state-city'
import { countriesWithCodes } from './deliveryFee.constant'
import { ICountry, IState } from './deliveryFee.interface'
import deliveryFeeModel from './deliveryFee.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const CreateFee = async (): Promise<ICountry[]> => {
  const data: ICountry[] = []

  for (const { country, phoneCode, code } of countriesWithCodes) {
    const states: IState[] = []

    for (const state of State.getStatesOfCountry(code)) {
      const cities: any = City.getCitiesOfState(code, state.isoCode)

      if (cities.length > 0) {
        const delivery_fee = 10
        const stateCities = cities.map((city: any) => ({
          city_name: city.name,
          delivery_fee,
        }))
        states.push({ state_name: state.name, cities: stateCities })
      } else {
        const delivery_fee = 10
        states.push({ state_name: state.name, delivery_fee })
      }
    }

    data.push({ country, country_code: code, phoneCode, states })
  }

  if (data.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No data found')
  }

  const deliveryFeeData = await deliveryFeeModel.create(data)
  if (!deliveryFeeData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delivery fee not created')
  }
  return deliveryFeeData
}

export const DeliveryFeeService = {
  CreateFee,
}
