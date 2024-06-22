import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ReminderModel from '../models/Reminder';
import UserModel from '../models/User';
import { ApiError } from '../exceptions/ApiError';


const create = async (req: Request, res: Response, next: NextFunction) => {
	try {

		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);

		if (index === -1) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const doc = new ReminderModel({
			title: req.body.title,
			notes: req.body.notes,
			isCompleted: req.body.isCompleted,
			isFlagged: req.body.isFlagged,
			details: req.body.details,
		})


		user.lists[index].reminders.push(doc);
		await user.save();

		return res.json(doc);
	} catch (err) {
		next(err);
	}
}


const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {

		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}
		
		const list = user.lists.find((list) => String(list._id) === req.params.listId);

		if (!list) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		return res.json(list.reminders);
	} catch (err) {
		next(err);
	}
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return res.status(400).send({error: 'User not found'});
		}


		const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
		
		if (index === -1) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		const reminder = user.lists[index].reminders.find((reminder) => (
			String(reminder._id) === req.params.id
		));

		if (!reminder) {
			return res.status(404).send({error: 'Reminder with such id not found'});
		}

		return res.json(reminder);
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

		const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
		
		if (index === -1) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		user.lists[index].reminders = user.lists[index].reminders.filter((reminder) => (
			String(reminder._id) !== req.params.id
		));

		await user.save();

		return res.status(204).send();
	} catch (err) {
		next(err);
	}
}

const removeAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
		
		if (index === -1) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		user.lists[index].reminders = [];

		await user.save();

		return res.status(204).send();
	} catch (err) {
		next(err);
	}
}

const updateAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('User not found'));
		}

		const index = user.lists.findIndex((list) => String(list._id) === req.params.listId);
		
		if (index === -1) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		const newReminders = req.body.reminders; 
		user.lists[index].reminders = newReminders;
		await user.save();

		return res.json(newReminders);
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

		const listIndex = user.lists.findIndex((list) => String(list._id) === req.params.listId);
		
		if (listIndex === -1) {
			return next(ApiError.BadRequest('List with such id not found'));
		}

		const reminderIndex = user.lists[listIndex].reminders.findIndex(reminder => (
			String(reminder._id) === req.params.id
		));

		if (reminderIndex === -1) {
			return res.status(404).send({error: 'Reminder not found'});
		}

		const userBaseData = user.lists[listIndex].reminders[reminderIndex];

		const newReminder = {
			...userBaseData._doc,
			...req.body,
			details: {
				...userBaseData._doc.details,
				...req.body.details,
			}
		}

		user.lists[listIndex].reminders[reminderIndex] = newReminder;

		await user.save();

		return res.json(newReminder);
	} catch (err) {
		next(err);
	}
}

export {
	create,
	getAll,
	getOne,
	remove,
	removeAll,
	updateAll,
	update,
}