'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
/* eslint-disable no-console */
// Custom error class
class ApiError extends Error {
  constructor(statusCode, message, stack = '') {
    super(message)
    this.statusCode = statusCode
    this.statusCode = statusCode
    console.log('reached here in api error')
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
exports.default = ApiError
