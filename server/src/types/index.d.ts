import { JwtPayload } from "jsonwebtoken";

declare module 'express-serve-static-core' {
    export interface Request {
        userId?: string | JwtPayload;
    }
}