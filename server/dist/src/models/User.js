"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const List_1 = require("./List");
const lists_1 = require("../constants/lists");
const UserSchema = new mongoose_1.default.Schema({
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    lists: {
        type: [List_1.ListSchema],
        default: lists_1.initialLists,
    }
});
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
