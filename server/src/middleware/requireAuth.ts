import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

type DecodePayloadType = JwtPayload & { _id: string };

export default (req: Request, res: Response, next: NextFunction) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodePayloadType;
			res.locals.userId = decoded._id;
			res.locals.token = token;

			next()
		} catch (err) {
			return res.status(403).json({error: err})
		}
	} else {
		return res.status(403).json({message: 'No access'})
	}
}