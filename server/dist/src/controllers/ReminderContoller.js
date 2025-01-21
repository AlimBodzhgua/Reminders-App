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
exports.update = exports.updateAll = exports.removeAll = exports.remove = exports.getOne = exports.getAll = exports.create = void 0;
const express_validator_1 = require("express-validator");
const Reminder_1 = __importDefault(require("../models/Reminder"));
const User_1 = __importDefault(require("../models/User"));
const ApiError_1 = require("../exceptions/ApiError");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(ApiError_1.ApiError.ValidationError(errors.array()));
        }
        const doc = new Reminder_1.default({
            title: req.body.title,
            notes: req.body.notes,
            isCompleted: req.body.isCompleted,
            isFlagged: req.body.isFlagged,
            details: req.body.details,
        });
        user.lists[index].reminders.push(doc);
        yield user.save();
        return res.json(doc);
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const list = user.lists.find((list) => String(list._id) === req.params.listId);
        if (!list) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        return res.json(list.reminders);
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        const reminder = user.lists[index].reminders.find((reminder) => (String(reminder._id) === req.params.id));
        if (!reminder) {
            return res.status(404).send({ error: 'Reminder with such id not found' });
        }
        return res.json(reminder);
    }
    catch (err) {
        next(err);
    }
});
exports.getOne = getOne;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        user.lists[index].reminders = user.lists[index].reminders.filter((reminder) => (String(reminder._id) !== req.params.id));
        yield user.save();
        return res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.remove = remove;
const removeAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        user.lists[index].reminders = [];
        yield user.save();
        return res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.removeAll = removeAll;
const updateAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(ApiError_1.ApiError.ValidationError(errors.array()));
        }
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        const newReminders = req.body.reminders;
        user.lists[index].reminders = newReminders;
        yield user.save();
        return res.json(newReminders);
    }
    catch (err) {
        next(err);
    }
});
exports.updateAll = updateAll;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(ApiError_1.ApiError.ValidationError(errors.array()));
        }
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const listIndex = user.lists.findIndex((list) => String(list._id) === req.params.listId);
        if (listIndex === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id not found'));
        }
        const reminderIndex = user.lists[listIndex].reminders.findIndex(reminder => (String(reminder._id) === req.params.id));
        if (reminderIndex === -1) {
            return res.status(404).send({ error: 'Reminder not found' });
        }
        const userBaseData = user.lists[listIndex].reminders[reminderIndex];
        const newReminder = Object.assign(Object.assign(Object.assign({}, userBaseData._doc), req.body), { details: Object.assign(Object.assign({}, userBaseData._doc.details), req.body.details) });
        user.lists[listIndex].reminders[reminderIndex] = newReminder;
        yield user.save();
        return res.json(newReminder);
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
