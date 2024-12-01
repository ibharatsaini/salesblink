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
const agenda_1 = __importDefault(require("agenda"));
const mailer_1 = __importDefault(require("./mailer"));
const MONGODB_URL = process.env.MONGODB_URL;
const SENDER = process.env.EMAIL_SENDER;
const agenda = new agenda_1.default({ db: { address: MONGODB_URL, collection: 'jobs' } });
agenda.define('send email', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipient, subject, body, currentDelay } = job.attrs.data;
    console.log(`Recipient ,`, recipient, subject, body, currentDelay, new Date(currentDelay));
    try {
        yield mailer_1.default.sendMail({
            from: SENDER,
            to: recipient,
            subject,
            text: body,
        });
        console.log(`Initial email sent to ${recipient}`);
    }
    catch (error) {
        console.log(error);
        console.error(`Error sending initial email to ${recipient}:`, error);
    }
}));
exports.default = agenda;
