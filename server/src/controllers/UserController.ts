import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { TokenService } from '../services/TokenService';
import { ApiError } from '../exceptions/ApiError';
import UserModel from '../models/User';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array())); 
		};

		const candidate = await UserModel.findOne({email: req.body.email});

		if (candidate) {
			return next(ApiError.BadRequest('User with such email already registered'));
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			login: req.body.login,
			email: req.body.email,
			passwordHash: hash,
			avatarUrl: req.body.avatarUrl,
		});

		const user = await doc.save();
		const token = TokenService.generateToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return res.json({...userData, token});
	} catch (err) {
		next(err);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		};

		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return next(ApiError.BadRequest('Wrong password or email'));
		};

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPassword) {
			return next(ApiError.BadRequest('Wrong password or email'));
		};

		const token = TokenService.generateToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return res.json({...userData, token});
	} catch (err) {
		next(err);
	}
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('Such user does not exist'));
		};

		const { passwordHash, ...userData } = user._doc;

		return res.json({...userData, token: res.locals.token});
	} catch (err) {
		next(err)
	}
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('Such user does not exist'));
		};

	} catch (err) {
		next(err);
	}
};
