import { Request, Response } from 'express';
import { listCreateValidation, listUpdateValidation } from '../validations/validations';
import { validationResult } from 'express-validator';
import ListModel from '../models/List';
import UserModel from '../models/User';


export const create = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(listCreateValidation);

		if (!errors.isEmpty()) {
			return res.status(400).send({error: errors});
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
			return res.status(404).send({message: 'User not found'});
		}

		user.lists.push(doc);
		await user.save();
		const { passwordHash, ...userData } = user._doc;

		return res.json(userData);
	} catch (err) {
		return res.status(500).send({error: err});
	}
}

export const getAll = async (req: Request, res: Response) => {
	try {
		const userDoc = await UserModel.findById(res.locals.userId);

		if (!userDoc) {
			return res.status(404).send({error: 'User not found'});
		}

		return res.json(userDoc.lists);
	} catch (err) {
		return res.status(500).json({error: err});
	}
}

export const getOne = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return res.status(404).send({error: 'User not found'});
		}

		const list = user.lists.find(list => String(list._id) === req.params.id);

		if (!list) {
			return res.status(404).send({error: 'List not found'});
		}

		return res.json(list);
	} catch (err) {
		return res.status(500).json({error: err});
	}
}


export const remove = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return res.status(404).send({error: 'User not found'});
		}

		user.lists = user.lists.filter(list => (
			String(list._id) !== req.params.id
		));
		await user.save();

		const { passwordHash, ...userData } = user._doc;

		return res.json(userData);
	} catch (err) {
		return res.status(500).json({error: err});
	}
}

export const update = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(listUpdateValidation);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				zxc: 'zxc',
				error: errors
			});
		}

		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return res.status(404).send({error: 'User not found'});
		}

		const index = user.lists.findIndex(list => (
			String(list._id) === req.params.id
		));

		if (index === -1) {
			return res.status(404).send({error: 'List not found'});
		}

		const newList = {
			...user.lists[index]._doc,
			...req.body,
		}

		user.lists[index] = newList;

		await user.save();

		const { passwordHash, ...userData } = user._doc;

		return res.json(userData);
	} catch (err) {
		return res.status(500).send({zxc: 'zxc', error: err});
	}
}