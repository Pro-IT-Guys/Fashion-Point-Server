/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'
import { sendSuccessResponse } from './shared/customResponse'
import path = require('path')

// Import routes
import routes from './app/routes/index'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', async (req, res, next) => {
  const responseData = {
    message: 'Welcome to Express API template',
    data: null,
  }
  sendSuccessResponse(res, responseData)
})

// Serve static files
app.use(
  '/images/product',
  express.static(
    path.join(__dirname, '..', 'dist', 'public', 'images', 'product')
  )
)

// Define a route to handle the GET request for the images
app.get('/images/product/:filename', (req, res) => {
  const filename = req.params.filename
  const imagePath = path.join(
    __dirname,
    '..',
    'dist',
    'public',
    'images',
    'product',
    filename
  )
  res.sendFile(imagePath)
})

// All routes here
app.use('/api/v1', routes)
// Global error handler
app.use(globalErrorHandler)

// Forbidden routes
app.all('*', (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: 'false',
    message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
    errorMessages: [
      {
        message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
        path: req.originalUrl,
      },
    ],
    stack: '',
  })
})

export default app
