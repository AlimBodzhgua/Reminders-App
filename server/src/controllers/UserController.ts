import { Request, Response} from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { loginValidation, registerValidation } from '../validations/validations';
import UserModel from '../models/User';
import { TokenService } from '../services/TokenService';

export const login = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(loginValidation);

		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors});
		};

		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({ message: 'Wrong password or email' });
		};

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPassword) {
			return res.status(404).json({ message: 'Wrong password or email' });
		};

		const token = TokenService.generateToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return res.json({...userData, token});
	} catch (err) {
		return res.status(500).json({message: 'Failed to login user'});
	}
};


export const register = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(registerValidation);

		if (!errors.isEmpty()) {
			return res.status(400).json({'errors': errors.array()});
		};

		const candidate = await UserModel.findOne({email: req.body.email});

		if (candidate) {
			return res.status(400).json({error: 'User with such email already registered'});
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
		return res.status(500).json({message: 'Failed to register new user'});
	}
};


export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return res.status(400).json({message: 'Such user does not exist'});
		};

		const { passwordHash, ...userData } = user._doc;

		return res.json({...userData, token: res.locals.token});
	} catch (err) {
		return res.status(500).json({error: err});
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return res.status(400).json({message: 'Such user does not exist'});
		};

	} catch (err) {
		return res.status(500).json({error: err});
	}
};
