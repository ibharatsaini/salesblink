import { NextFunction, Request, Response } from "express";

const getSampleEmails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sampleEmails = [
    {
      name: "Sample Email",
    },
    {
      name: "Re: Follow Up",
    },
  ];

  res.status(200).json({
    data: sampleEmails,
  });
  return
};

export { getSampleEmails };
