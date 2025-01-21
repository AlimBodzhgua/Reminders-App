"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    static generateToken(userId) {
        const signToken = jsonwebtoken_1.default.sign({ _id: userId }, process.env.JWT_SECRET);
        return signToken;
    }
    ;
    static validateToken(token) {
        try {
            const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return decodedData;
        }
        catch (err) {
            return null;
        }
    }
}
exports.TokenService = TokenService;
