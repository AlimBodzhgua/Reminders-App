import { body } from 'express-validator';

export const userValidation = [
	body('login').optional().isLength({min: 4}),
	body('email', 'Email is required field').notEmpty().isEmail(),
	body('password', 'Password is requires field').isLength({min: 5}).notEmpty(),
	body('avatarUrl').optional().isURL(),
]

export const loginValidation = [
	body('email').notEmpty(),
	body('password').notEmpty(),
]