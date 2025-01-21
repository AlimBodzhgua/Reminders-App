"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ReminderSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: String,
    url: String,
    priority: String,
    isCompleted: {
        type: Boolean,
        require: true,
    },
    isFlagged: {
        type: Boolean,
        require: true,
    },
    details: {
        _id: false,
        location: String,
        time: String,
        date: String,
    },
}, { timestamps: true });
const ReminderModel = mongoose_1.default.model('Reminder', exports.ReminderSchema);
exports.default = ReminderModel;
