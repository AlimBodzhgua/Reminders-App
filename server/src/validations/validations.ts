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

export const reminderCreateValidation = [
	body('title').notEmpty().isLength({min: 2}).isString(),
	body('notes').optional().isLength({min: 2}).isString(),
	//body('date').optional().isDate(),
	body('date').optional().isString(),
	body('time').optional().isString(),
	//body('time').optional().isTime({hourFormat: 'hour24'}),
	body('location').optional(),
]

export const reminderUpdateValidation = [
	body('title').optional().isLength({min: 2}).isString(),
	body('notes').optional().isLength({min: 2}).isString(),
	body('date').optional().isString(),
	body('time').optional().isString(),
	body('location').optional().isString(),
]