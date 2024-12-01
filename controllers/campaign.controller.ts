import { NextFunction, Request, Response } from "express";
import agenda from "../lib/emailScheduling";
import sampleModel from "../models/email.model";
import asyncHandler from 'express-async-handler'

const addCampaign = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  const { leads, steps } = req.body;
  const sampleEmail = await sampleModel.find()
  // console.log(leads,steps)
  if (!Array.isArray(leads) || !Array.isArray(steps)) {
    res.status(400).json({ error: 'Invalid payload. Both leads and steps should be arrays.' });
    return
  }

  try {
    // Schedule jobs for all leads
    const schedulingPromises = leads.map(async (lead) => {
      let delay = 0; // Initialize delay for each lead

      const stepPromises = steps.map(async (step) => {
        if (step.type === 'cold-email') {
          const currentDelay = new Date(Date.now() + delay)
          // delay = 0
          const sample = sampleEmail.find(el=>el.id==step.emailBody)
          if(!sample) return Promise.reject()
          const { title:subject, body } = sample;
          console.log(subject,body)
          // Schedule email with current delay
          return agenda.schedule(currentDelay, 'send email', {
            recipient: lead,
            subject,
            body,
            currentDelay
          });
          
        } else if (step.type === 'wait') {
          const { time, type } = step.delay;
          if (type === 'minutes') delay += time * 60 * 1000;
          if (type === 'hours') delay += time * 60 * 60 * 1000;
          if (type === 'days') delay += time * 24 * 60 * 60 * 1000;
          return Promise.resolve();
        } else {
          return Promise.reject(new Error(`Unknown step type: ${step.type}`));
        }
      });

      return Promise.allSettled(stepPromises);
    });

    // Wait for all schedules to be processed
    const results = await Promise.allSettled(schedulingPromises);

    // Collect errors if any
    const errors = results
      .filter((result) => result.status === 'rejected')
      .map((result:any) => result.reason.message);

    if (errors.length) {
      console.error('Errors occurred during scheduling:', errors);
      res.status(500).json({ error: 'Some schedules failed.', details: errors });
      return
    }

    res.status(200).json({ message: 'Campaign scheduled successfully!' });
    return
  } catch (error) {
    console.error('Error scheduling campaign:', error);
    res.status(500).json({ error: 'Failed to schedule campaign.' });
    return
  }


})

export {
    addCampaign
}