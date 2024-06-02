import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/TokenService';
import { ApiError } from '../exceptions/ApiError';

export default (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const token = authHeader.replace(/Bearer\s?/, '');
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

		const decodedToken = TokenService.validateToken(token);
		if (!decodedToken) {
            return next(ApiError.UnauthorizedError());
		}
		
		res.locals.userId = decodedToken._id;
		res.locals.token = token;

		next()
	} catch (err) {
		return next(ApiError.UnauthorizedError());
	}
}