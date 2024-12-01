"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const SENDER = process.env.EMAIL_SENDER;
const PASSWORD = process.env.PASSWORD;
const transporter = nodemailer_1.default.createTransport({
    auth: {
        user: SENDER,
        pass: PASSWORD,
    },
    service: "gmail",
});
exports.default = transporter;
