import { NextFunction, Request, Response } from 'express'
import verifyToken from './verifyToken'
import userModel from '../modules/user/user.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    isAdmin(req, res, next).catch(next)
  })
}

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user || !req.user.email) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token payload')
    }

    const { email } = req.user
    const user = await userModel.findOne({ email })
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

    if (user.role === 'admin') {
      next()
    } else {
      res.status(403).json({
        message: 'You are not authorized to perform this action',
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        data: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

export default verifyAdmin
