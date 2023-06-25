import request from 'request-promise'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

interface GeolocationResponse {
  country: string
  city: string
}

const getCurrentLocation = async (geolocationURL: string) => {
  const body: GeolocationResponse = await request({
    url: geolocationURL,
    json: true,
  })
  if (!body) throw new ApiError(httpStatus.BAD_REQUEST, 'Location not found')

  const country = body.country
  const city = body.city

  return { country, city }
}

export const LocationService = {
  getCurrentLocation,
}
