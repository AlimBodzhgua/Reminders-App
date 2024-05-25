import { Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { loginValidation, registerValidation } from '../validations/validations';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModal from '../models/User';

const signToken = (userId: Types.ObjectId) => jwt.sign(
	{_id: userId},
	process.env.JWT_SECRET!,
	{expiresIn: '7d'}
)

export const login = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(loginValidation);

		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors});
		}

		const user = await UserModal.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({ message: 'Wrong password or email' });
		}

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPassword) {
			return res.status(404).json({ message: 'Wrong password or email' });
		}

		const token = signToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return res.json({
			success: true,
			message: 'User succesfully signed in',
			user: {...userData, token},
		})

	} catch (err) {
		return res.status(500).json({message: 'Failed to login user'});
	}
}


export const register = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(registerValidation);

		if (!errors.isEmpty()) {
			return res.status(400).json({'errors': errors.array()});
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModal({
			login: req.body.login,
			email: req.body.email,
			passwordHash: hash,
			avatarUrl: req.body.avatarUrl,
		})

		const user = await doc.save();

		const token = signToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return res.json({...userData, token});
	} catch (err) {
		return res.status(500).json({message: 'Failed to register new user'});
	}
}


export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await UserModal.findById(res.locals.userId);

		if (!user) {
			return res.status(400).json({message: 'Such user does not exist'});
		}

		const { passwordHash, ...userData } = user._doc;

		return res.json({userData})
	} catch (err) {
		return res.status(500).json({error: err});
	}
}