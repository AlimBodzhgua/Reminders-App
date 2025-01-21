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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getMe = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const TokenService_1 = require("../services/TokenService");
const ApiError_1 = require("../exceptions/ApiError");
const User_1 = __importDefault(require("../models/User"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(ApiError_1.ApiError.ValidationError(errors.array()));
        }
        ;
        const candidate = yield User_1.default.findOne({ email: req.body.email });
        if (candidate) {
            return next(ApiError_1.ApiError.BadRequest('User with such email already registered'));
        }
        const password = req.body.password;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const doc = new User_1.default({
            login: req.body.login,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        });
        const user = yield doc.save();
        const token = TokenService_1.TokenService.generateToken(user._id);
        const _a = user._doc, { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
        return res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(ApiError_1.ApiError.ValidationError(errors.array()));
        }
        ;
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('Wrong password or email'));
        }
        ;
        const isValidPassword = yield bcrypt_1.default.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPassword) {
            return next(ApiError_1.ApiError.BadRequest('Wrong password or email'));
        }
        ;
        const token = TokenService_1.TokenService.generateToken(user._id);
        const _b = user._doc, { passwordHash } = _b, userData = __rest(_b, ["passwordHash"]);
        return res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('Such user does not exist'));
        }
        ;
        const _c = user._doc, { passwordHash } = _c, userData = __rest(_c, ["passwordHash"]);
        return res.json(Object.assign(Object.assign({}, userData), { token: res.locals.token }));
    }
    catch (err) {
        next(err);
    }
});
exports.getMe = getMe;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.userId);
        if (!user) {
            return next(ApiError_1.ApiError.BadRequest('Such user does not exist'));
        }
        ;
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
