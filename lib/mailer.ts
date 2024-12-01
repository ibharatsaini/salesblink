import nodemailer from "nodemailer";
const SENDER = process.env.EMAIL_SENDER;
const PASSWORD = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  auth: {
    user: SENDER,
    pass: PASSWORD,
  },
  service: "gmail",
});


export default transporter