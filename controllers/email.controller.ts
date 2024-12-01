import { NextFunction, Request, Response } from "express";
import sampleModel from "../models/email.model";
import expressAsyncHandler from "express-async-handler";


const getSampleEmails = expressAsyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emails = await sampleModel.find()
  res.status(200).json({
    data: emails,
  });
  return
});

export { getSampleEmails };
