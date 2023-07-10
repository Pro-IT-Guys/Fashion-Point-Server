"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.default.app_email,
        pass: config_1.default.app_password,
    },
});
function sendEmail(recipient, subject, message) {
    // setup email data with unicode symbols
    const mailOptions = {
        from: config_1.default.app_email,
        to: recipient,
        subject: subject,
        text: message,
    };
    // send mail with defined transport object
    return transporter.sendMail(mailOptions);
}
exports.default = sendEmail;
