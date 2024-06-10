import { Router } from 'express';
import { reminderCreateValidation, reminderUpdateValidation } from '../validations/validations';
import * as ReminderController from '../controllers/ReminderContoller';
import requireAuth from '../middleware/requireAuth';

const router = Router({mergeParams: true});

// /reminders
router.post('/', requireAuth, reminderCreateValidation, ReminderController.create);
router.get('/', requireAuth, ReminderController.getAll);
router.get('/:id', requireAuth, ReminderController.getOne);
router.delete('/', requireAuth, ReminderController.removeAll);
router.delete('/:id', requireAuth, ReminderController.remove);
//router.patch('/:id', requireAuth, reminderUpdateValidation, ReminderContoller.update);

export default router;