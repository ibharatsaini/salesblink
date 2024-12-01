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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const emailScheduling_1 = __importDefault(require("./lib/emailScheduling"));
const app = (0, express_1.default)();
const emailRoutes = require("./routes/email.routes");
const campaignRoutes = require("./routes/campaign.route");
const MONGODB_URL = process.env.MONGODB_URL;
const SENDER = process.env.EMAIL_SENDER;
const PASSWORD = process.env.PASSWORD;
if (!MONGODB_URL || !SENDER || !PASSWORD) {
    throw new Error(`MONGODB_URL, SENDER, PASSWORD required in .env`);
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield emailScheduling_1.default.start();
        console.log('Agenda started.');
    });
})();
const allowedOrigins = [
    "http://localhost:3000",
    /\.vercel\.app$/, // regex to match any subdomain on vercel.app
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.some((allowedOrigin) => allowedOrigin instanceof RegExp
            ? allowedOrigin.test(origin)
            : allowedOrigin === origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
// app.use(cors());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/emails", emailRoutes);
app.use("/api/campaign", campaignRoutes);
exports.default = app;
