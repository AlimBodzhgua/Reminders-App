import { Types } from 'mongoose';
import { DecodePayloadType } from '../types/types';
import jwt from 'jsonwebtoken';

export class TokenService {

	static generateToken(userId: Types.ObjectId) {
		const signToken = jwt.sign({_id: userId}, process.env.JWT_SECRET!);
		return signToken;
	};

	static validateToken(token: string) {
		try {
			const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as DecodePayloadType;
			return decodedData;
		} catch (err) {
			return null;
		}
	}
}
