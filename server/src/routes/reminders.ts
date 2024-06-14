import { Router } from 'express';
import {
	allRemindersUpdateValidation,
	reminderCreateValidation,
	reminderUpdateValidation,
} from '../validations/validations';
import * as ReminderController from '../controllers/ReminderContoller';
import requireAuth from '../middleware/requireAuth';

const router = Router({mergeParams: true});

// /lists/:listId/reminders
router.post('/', requireAuth, reminderCreateValidation, ReminderController.create);
router.get('/', requireAuth, ReminderController.getAll);
router.get('/:id', requireAuth, ReminderController.getOne);
router.delete('/', requireAuth, ReminderController.removeAll);
router.delete('/:id', requireAuth, ReminderController.remove);
router.patch('/:id', requireAuth, reminderUpdateValidation, ReminderController.update);
router.post('/all', requireAuth, allRemindersUpdateValidation, ReminderController.updateAll);


export default router;