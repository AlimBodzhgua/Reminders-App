import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/TokenService';

export default (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({message: 'No access'});
        }

        const token = authHeader.replace(/Bearer\s?/, '');
        if (!token) {
            return res.status(403).json({message: 'No access'});
        }

		const decodedToken = TokenService.validateToken(token);
		if (!decodedToken) {
			return res.status(403).json({message: 'No access'});
		}
		
		res.locals.userId = decodedToken._id;
		res.locals.token = decodedToken;

		next()
	} catch (err) {
		return res.status(403).json({error: err})
	}
}