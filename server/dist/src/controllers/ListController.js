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
exports.updateAll = exports.remove = exports.getAll = exports.getOne = exports.update = exports.create = void 0;
const express_validator_1 = require("express-validator");
const ApiError_1 = require("../exceptions/ApiError");
const List_1 = __importDefault(require("../models/List"));
const User_1 = __importDefault(require("../models/User"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(ApiError_1.ApiError.ValidationError(errors.array()));
        }
        const doc = new List_1.default({
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
            _isMutable: true,
            pinned: false,
            sortField: 'creation',
            sortDirection: 'asc',
            reminders: [],
        });
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        user.lists.push(doc);
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
        const userDoc = yield User_1.default.findById(res.locals.userId);
        if (!userDoc) {
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        return res.json(userDoc.lists);
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
            return next(ApiError_1.ApiError.BadRequest('User not found'));
        }
        const list = user.lists.find(list => String(list._id) === req.params.id);
        if (!list) {
            return next(ApiError_1.ApiError.BadRequest('List with such id does not exist'));
        }
        return res.json(list);
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
        const index = user.lists.findIndex(list => String(list._id) === req.params.id);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id does not exist'));
        }
        user.lists = user.lists.filter(list => String(list._id) !== req.params.id);
        yield user.save();
        return res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.remove = remove;
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
        const index = user.lists.findIndex(list => String(list._id) === req.params.id);
        if (index === -1) {
            return next(ApiError_1.ApiError.BadRequest('List with such id does not exist'));
        }
        const newList = Object.assign(Object.assign({}, user.lists[index]._doc), req.body);
        user.lists[index] = newList;
        yield user.save();
        return res.json(newList);
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
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
        const newLists = req.body.lists;
        user.lists = newLists;
        yield user.save();
        return res.json(newLists);
    }
    catch (err) {
        next(err);
    }
});
exports.updateAll = updateAll;
