"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../exceptions/ApiError");
const errorHandler = (err, req, res, next) => {
    console.log('Error Handler', err);
    if (err instanceof ApiError_1.ApiError) {
        const { message, errors } = err;
        return res.status(err.status).json({ message, errors });
    }
    return res.status(500).json({ message: 'An unexpected error occured' });
};
exports.default = errorHandler;
