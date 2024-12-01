import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: ".env" });
import {Agenda} from 'agenda'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import nodemailer from 'nodemailer'
import agenda from './lib/emailScheduling';


const app = express();

const emailRoutes = require("./routes/email.routes");
const campaignRoutes = require("./routes/campaign.route")

const MONGODB_URL = process.env.MONGODB_URL!
const SENDER = process.env.EMAIL_SENDER!
const PASSWORD = process.env.PASSWORD!

if(!MONGODB_URL || !SENDER || !PASSWORD) {
  throw new Error(`MONGODB_URL, SENDER, PASSWORD required in .env`)
}



(async function () {
  await agenda.start();
  console.log('Agenda started.');
})();



const allowedOrigins = [
  "http://localhost:3000",
  /\.vercel\.app$/, // regex to match any subdomain on vercel.app
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.some((allowedOrigin) =>
          allowedOrigin instanceof RegExp
            ? allowedOrigin.test(origin)
            : allowedOrigin === origin
        )
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/emails", emailRoutes);
app.use("/api/campaign",campaignRoutes)

export default app;

