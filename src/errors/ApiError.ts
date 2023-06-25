/* eslint-disable no-console */
// Custom error class
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string | undefined,
    stack = ''
  ) {
    super(message)
    this.statusCode = statusCode
    console.log('reached here in api error')
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
