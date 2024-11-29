import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: ".env" });

import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

const emailRoutes = require("./routes/email.routes");

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

export default app;
