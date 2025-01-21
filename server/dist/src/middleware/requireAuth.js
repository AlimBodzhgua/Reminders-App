"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_1 = require("../services/TokenService");
const ApiError_1 = require("../exceptions/ApiError");
exports.default = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError_1.ApiError.UnauthorizedError());
        }
        const token = authHeader.replace(/Bearer\s?/, '');
        if (!token) {
            return next(ApiError_1.ApiError.UnauthorizedError());
        }
        const decodedToken = TokenService_1.TokenService.validateToken(token);
        if (!decodedToken) {
            return next(ApiError_1.ApiError.UnauthorizedError());
        }
        res.locals.userId = decodedToken._id;
        res.locals.token = token;
        next();
    }
    catch (err) {
        return next(ApiError_1.ApiError.UnauthorizedError());
    }
};
