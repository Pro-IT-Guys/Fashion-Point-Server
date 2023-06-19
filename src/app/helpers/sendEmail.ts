import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})

function sendEmail(recipient: string, subject: string, message: string) {
  // setup email data with unicode symbols
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: recipient,
    subject: subject,
    text: message,
  }

  // send mail with defined transport object
  return transporter.sendMail(mailOptions)
}

export default sendEmail
