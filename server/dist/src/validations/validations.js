"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderUpdateValidation = exports.reminderCreateValidation = exports.allRemindersUpdateValidation = exports.allListsUpdateValidation = exports.listUpdateValidation = exports.listCreateValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('login').optional().isLength({ min: 4 }).isString(),
    (0, express_validator_1.body)('email').notEmpty().isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 5 }).notEmpty().isString(),
    (0, express_validator_1.body)('avatarUrl').optional().isURL(),
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').notEmpty().isString(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
];
exports.listCreateValidation = [
    (0, express_validator_1.body)('name').notEmpty().isString().isLength({ min: 2 }),
    (0, express_validator_1.body)('color').notEmpty().isString(),
    (0, express_validator_1.body)('icon').notEmpty().isString(),
];
exports.listUpdateValidation = [
    (0, express_validator_1.body)('name').optional().isString().isLength({ min: 2 }),
    (0, express_validator_1.body)('color').optional().isString(),
    (0, express_validator_1.body)('icon').optional().isString(),
    (0, express_validator_1.body)('pinned').optional().isBoolean(),
    (0, express_validator_1.body)('sortField').optional().isString(),
    (0, express_validator_1.body)('sortDiection').optional().isString(),
];
exports.allListsUpdateValidation = [
    (0, express_validator_1.body)('lists').notEmpty().isArray(),
];
exports.allRemindersUpdateValidation = [
    (0, express_validator_1.body)('reminders').notEmpty().isArray(),
];
exports.reminderCreateValidation = [
    (0, express_validator_1.body)('title').notEmpty().isLength({ min: 2 }).isString(),
    (0, express_validator_1.body)('isCompleted').notEmpty().isBoolean(),
    (0, express_validator_1.body)('isFlagged').notEmpty().isBoolean(),
    (0, express_validator_1.body)('notes').optional().isLength({ min: 2 }).isString(),
    (0, express_validator_1.body)('details').optional().isObject(),
    (0, express_validator_1.body)('url').optional().isURL(),
    (0, express_validator_1.body)('priority').optional().isString(),
];
exports.reminderUpdateValidation = [
    (0, express_validator_1.body)('title').optional().isLength({ min: 2 }).isString(),
    (0, express_validator_1.body)('notes').optional().isLength({ min: 2 }).isString(),
    (0, express_validator_1.body)('details').optional().isObject(),
    (0, express_validator_1.body)('url').optional().isURL(),
    (0, express_validator_1.body)('isFlagged').optional().isBoolean(),
    (0, express_validator_1.body)('isCompleted').optional().isBoolean(),
    (0, express_validator_1.body)('priority').optional().isString(),
];
