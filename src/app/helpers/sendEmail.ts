import nodemailer from 'nodemailer'
import config from '../../config'

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.app_email,
    pass: config.app_password,
  },
})

function sendEmail(recipient: string, subject: string, message: string) {
  // setup email data with unicode symbols
  const mailOptions = {
    from: config.app_email,
    to: recipient,
    subject: subject,
    text: message,
  }

  // send mail with defined transport object
  return transporter.sendMail(mailOptions)
}

export default sendEmail
