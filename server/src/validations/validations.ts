import { body } from 'express-validator';

export const registerValidation = [
	body('login').optional().isLength({min: 4}).isString(),
	body('email').notEmpty().isEmail(),
	body('password').isLength({min: 5}).notEmpty().isString(),
	body('avatarUrl').optional().isURL(),
]

export const loginValidation = [
	body('email').notEmpty().isString(),
	body('password').notEmpty().isString(),
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