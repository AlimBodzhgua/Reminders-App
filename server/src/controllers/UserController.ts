import { Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { loginValidation, userValidation } from '../validations/validations';
import UserModal from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret-token',
			{
				expiresIn: '7d',
			}
		)
		const { passwordHash, ...userData } = user._doc;

		return res.json({
			success: true,
			message: 'User succesfully signed in',
			user: {...userData, token},
		})

	} catch (err) {
		console.log(err);
		return res.status(500).json({message: 'Failed to login user'});
	}
}


export const register = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(userValidation);

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

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret-token',
			{
				expiresIn: '7d',
			},
		);

		const { passwordHash, ...userData } = user._doc;

		return res.json({
			success: true,
			message: 'User succesfully created',
			user: {...userData, token},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({message: 'Failed to register new user'});
	}
}


export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await UserModal.findById(res.locals.userId);
		console.log(res.locals);

		if (!user) {
			return res.status(400).json({message: 'Such user does not exist'});
		}

		const { passwordHash, ...userData } = user._doc;

		return res.json({userData})
	} catch (err) {
		return res.status(500).json({error: err});
	}
}