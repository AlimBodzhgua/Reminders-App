"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Reminder_1 = require("./Reminder");
exports.ListSchema = new mongoose_1.default.Schema({
    name: {
        require: true,
        type: String,
    },
    icon: {
        require: true,
        type: String
    },
    color: {
        require: true,
        type: String,
    },
    pinned: {
        type: Boolean,
        require: true,
    },
    _isMutable: {
        type: Boolean,
        require: true,
        immutable: true,
    },
    sortField: {
        type: String,
        require: true,
    },
    sortDirection: {
        type: String,
        require: true,
    },
    reminders: [Reminder_1.ReminderSchema]
});
const ListModel = mongoose_1.default.model('List', exports.ListSchema);
exports.default = ListModel;
