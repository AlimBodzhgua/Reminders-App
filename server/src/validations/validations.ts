import { body } from 'express-validator';

export const registerValidation = [
	body('login').optional().isLength({min: 4}).isString(),
	body('email').notEmpty().isEmail(),
	body('password').isLength({min: 5}).notEmpty().isString(),
	body('avatarUrl').optional().isURL(),
];

export const loginValidation = [
	body('email').notEmpty().isString(),
	body('password').notEmpty().isString(),
];

export const listCreateValidation = [
	body('name').notEmpty().isString().isLength({min: 2}),
	body('color').notEmpty().isString(),
	body('icon').notEmpty().isString(),
];

export const listUpdateValidation = [
	body('name').optional().isString().isLength({min: 2}),
	body('color').optional().isString(),
	body('icon').optional().isString(),
	body('pinned').optional().isBoolean(),
];

export const reminderCreateValidation = [
	body('title').notEmpty().isLength({min: 2}).isString(),
	body('notes').optional().isLength({min: 2}).isString(),
	body('date').optional().isString(),
	body('time').optional().isString(),
	body('location').optional().isString(),
];

export const reminderUpdateValidation = [
	body('title').optional().isLength({min: 2}).isString(),
	body('notes').optional().isLength({min: 2}).isString(),
	body('date').optional().isString(),
	body('time').optional().isString(),
	body('location').optional().isString(),
];
