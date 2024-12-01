"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sampleEmail = new mongoose_1.default.Schema({
    body: {
        type: String,
        required: [true, "Body is required."]
    },
    title: {
        type: String,
        required: [true, "Subject is required."]
    },
});
const sampleModel = mongoose_1.default.model("email", sampleEmail);
exports.default = sampleModel;
