import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { LocationService } from './location.service'

const getCurrentLocation = catchAsync(async (req: Request, res: Response) => {
  let clientIp = req.headers['x-real-ip'] || req.connection.remoteAddress

  // Fallback for localhost IP address
  if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
    clientIp = '' // Leave it empty to let the IP geolocation service determine the IP automatically.Set to empty string to get public IP addressz
  }

  const geolocationURL = `http://ip-api.com/json/${clientIp}`
  const location = await LocationService.getCurrentLocation(geolocationURL)

  const responseData = {
    message: 'Current location',
    data: location,
  }

  sendSuccessResponse(res, responseData)
})

export const LocationController = {
  getCurrentLocation,
}
