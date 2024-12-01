"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCampaign = void 0;
const emailScheduling_1 = __importDefault(require("../lib/emailScheduling"));
const email_model_1 = __importDefault(require("../models/email.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addCampaign = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { leads, steps } = req.body;
    const sampleEmail = yield email_model_1.default.find();
    // console.log(leads,steps)
    if (!Array.isArray(leads) || !Array.isArray(steps)) {
        res.status(400).json({ error: 'Invalid payload. Both leads and steps should be arrays.' });
        return;
    }
    try {
        // Schedule jobs for all leads
        const schedulingPromises = leads.map((lead) => __awaiter(void 0, void 0, void 0, function* () {
            let delay = 0; // Initialize delay for each lead
            const stepPromises = steps.map((step) => __awaiter(void 0, void 0, void 0, function* () {
                if (step.type === 'cold-email') {
                    const currentDelay = new Date(Date.now() + delay);
                    // delay = 0
                    const sample = sampleEmail.find(el => el.id == step.emailBody);
                    if (!sample)
                        return Promise.reject();
                    const { title: subject, body } = sample;
                    console.log(subject, body);
                    // Schedule email with current delay
                    return emailScheduling_1.default.schedule(currentDelay, 'send email', {
                        recipient: lead,
                        subject,
                        body,
                        currentDelay
                    });
                }
                else if (step.type === 'wait') {
                    const { time, type } = step.delay;
                    if (type === 'minutes')
                        delay += time * 60 * 1000;
                    if (type === 'hours')
                        delay += time * 60 * 60 * 1000;
                    if (type === 'days')
                        delay += time * 24 * 60 * 60 * 1000;
                    return Promise.resolve();
                }
                else {
                    return Promise.reject(new Error(`Unknown step type: ${step.type}`));
                }
            }));
            return Promise.allSettled(stepPromises);
        }));
        // Wait for all schedules to be processed
        const results = yield Promise.allSettled(schedulingPromises);
        // Collect errors if any
        const errors = results
            .filter((result) => result.status === 'rejected')
            .map((result) => result.reason.message);
        if (errors.length) {
            console.error('Errors occurred during scheduling:', errors);
            res.status(500).json({ error: 'Some schedules failed.', details: errors });
            return;
        }
        res.status(200).json({ message: 'Campaign scheduled successfully!' });
        return;
    }
    catch (error) {
        console.error('Error scheduling campaign:', error);
        res.status(500).json({ error: 'Failed to schedule campaign.' });
        return;
    }
}));
exports.addCampaign = addCampaign;
