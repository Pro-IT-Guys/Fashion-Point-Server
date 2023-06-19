import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

declare module 'express' {
  interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any // Replace `any` with the actual type of `user` if known
  }
}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(' ')[1] || ''
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token not found')
  }

  try {
    const decoded = jwt.verify(token, config.access_token as string)
    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}
