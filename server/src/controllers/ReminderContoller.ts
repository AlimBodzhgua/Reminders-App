import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { reminderCreateValidation, reminderUpdateValidation } from '../validations/validations';
import ReminderModel from '../models/Reminder';
import UserModal from '../models/User';

export const create = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(reminderCreateValidation);

		if (!errors.isEmpty()) {
			return res.status(400).send({error: errors});
		}

		const doc = new ReminderModel({
			title: req.body.title,
			notes: req.body.notes,
			details: {
				date: req.body.date,
				time: req.body.location,
				location: req.body.location,
			}
		})

		const userDoc = await UserModal.findById(res.locals.userId);
		userDoc!.reminders.push(doc);
		await userDoc!.save();

		return res.send({user: userDoc});
	} catch (err) {
		return res.status(500).send({error: err});
	}
}

export const getOne = async (req: Request, res: Response) => {
	try {
		const user = await UserModal.findById(res.locals.userId);

		if (!user) {
			return res.status(400).send({error: 'User not found'});
		}

		const reminder = user.reminders.find(reminder => (
			String(reminder._id) === req.params.id
		));

		if (!reminder) {
			return res.status(404).send({error: 'Reminder with such id not found'});
		}

		return res.send({reminder});
	} catch (err) {
		return res.status(500).send({error: err});
	}
}

export const getAll = async (req: Request, res: Response) => {
	try {
		const user = await UserModal.findById(res.locals.userId);

		if (!user) {
			return res.status(400).send({error: 'User not found'});
		}
		
		return res.send({reminders: user.reminders});
	} catch (err) {
		return res.status(500).send({error: err});
	}
}


export const remove = async (req: Request, res: Response) => {
	try {
		const user = await UserModal.findById(res.locals.userId);

		if (!user) {
			return res.status(400).send({error: 'User not found'});
		}

		user.reminders = user.reminders.filter(reminder => (
			String(reminder._id) !== req.params.id
		));

		await user.save();

		return res.send(user.reminders);
	} catch (err) {
		return res.status(500).send({error: err});
	}
}

export const update = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(reminderUpdateValidation);

		if (!errors.isEmpty()) {
			return res.status(400).json({error: errors});
		}

		const user = await UserModal.findById(res.locals.userId);

		if (!user) {
			return res.status(404).send({error: 'User not found'});
		}

		const index = user.reminders.findIndex(reminder => (
			String(reminder._id) === req.params.id
		));

		if (index === -1) {
			return res.status(404).send({error: 'Reminder not found'});
		}

		const newReminder = {
			...user.reminders[index]._doc,
			...req.body,
			details: {
				...user.reminders[index]._doc.details,
				...req.body.details,
			}
		}

		user.reminders[index] = newReminder;

		await user.save();

		return res.send({user});
	} catch (err) {
		return res.status(500).send({error: err});
	}
}