'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.errorLogger = exports.successLogger = void 0
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const winston_1 = require('winston')
const { combine, timestamp, label, printf } = winston_1.format
// Custom Log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp).toDateString()
  const hour = new Date(timestamp).getHours()
  const minutes = new Date(timestamp).getMinutes()
  const seconds = new Date(timestamp).getSeconds()
  const time = `${hour}:${minutes}:${seconds}`
  return `${date} | ${time} [${label}] ${level}: ${message}`
})
const successLogger = (0, winston_1.createLogger)({
  level: 'info',
  format: combine(label({ label: 'Success Log' }), timestamp(), myFormat),
  transports: [
    new winston_1.transports.Console(),
    // new DailyRotateFile({
    //   filename: path.join(
    //     process.cwd(),
    //     'logs',
    //     'winston',
    //     'success',
    //     'phu-%DATE%-success.log'
    //   ),
    //   datePattern: 'YYYY-MM-DD-HH',
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    // }),
  ],
})
exports.successLogger = successLogger
const errorLogger = (0, winston_1.createLogger)({
  level: 'error',
  format: combine(label({ label: 'Error Log' }), timestamp(), myFormat),
  transports: [
    new winston_1.transports.Console(),
    // new DailyRotateFile({
    //   filename: path.join(
    //     process.cwd(),
    //     'logs',
    //     'winston',
    //     'error',
    //     'phu-%DATE%-error.log'
    //   ),
    //   datePattern: 'YYYY-MM-DD-HH',
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    // }),
  ],
})
exports.errorLogger = errorLogger
