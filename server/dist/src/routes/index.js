"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const lists_1 = __importDefault(require("./lists"));
const reminders_1 = __importDefault(require("./reminders"));
const router = (0, express_1.Router)({ strict: true });
router.use('/users', users_1.default);
router.use('/lists', lists_1.default);
router.use('/lists/:listId/reminders', reminders_1.default);
exports.default = router;
