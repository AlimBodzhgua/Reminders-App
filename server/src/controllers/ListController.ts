import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/ApiError';
import ListModel from '../models/List';
import UserModel from '../models/User';

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const doc = new ListModel({
			name: req.body.name,
			color: req.body.color,
			icon: req.body.icon,
			pinned: false,
			reminders: [],
		})

		const user = await UserModel.findById(res.locals.userId);
		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		user.lists.push(doc);
		await user.save();

		return res.json(doc)
	} catch (err) {
		next(err);
	}
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userDoc = await UserModel.findById(res.locals.userId);

		if (!userDoc) {
			return next(ApiError.BadRequest('User not found'));
		}

		return res.json(userDoc.lists);
	} catch (err) {
		next(err);
	}
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		const list = user.lists.find(list => String(list._id) === req.params.id);

		if (!list) {
			return next(ApiError.BadRequest('List with such id does not exist'));
		}

		return res.json(list);
	} catch (err) {
		next(err);
	}
}


const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);
		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		const index = user.lists.findIndex(list => String(list._id) === req.params.id);
		if (index === -1) {
			return next(ApiError.BadRequest('List with such id does not exist'));
		}

		user.lists = user.lists.filter(list => String(list._id) !== req.params.id);
		await user.save();

		return res.status(204).send();
	} catch (err) {
		next(err);
	}
}

const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const user = await UserModel.findById(res.locals.userId);
		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		const index = user.lists.findIndex(list => String(list._id) === req.params.id);
		if (index === -1) {
			return next(ApiError.BadRequest('List with such id does not exist'));
		}

		const newList = {
			...user.lists[index]._doc,
			...req.body,
		}

		user.lists[index] = newList;
		await user.save();

		return res.json(newList);
	} catch (err) {
		next(err);
	}
}

export {
	create,
	update,
	getOne,
	getAll,
	remove,
};