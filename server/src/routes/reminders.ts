import { Router } from 'express';
import { reminderCreateValidation, reminderUpdateValidation } from '../validations/validations';
import * as ReminderContoller from '../controllers/ReminderContoller';
import requireAuth from '../middleware/requireAuth';

const router = Router({mergeParams: true});

// /reminders
router.post('/', requireAuth, reminderCreateValidation, ReminderContoller.create);
router.get('/', requireAuth, ReminderContoller.getAll);
router.get('/:id', requireAuth, ReminderContoller.getOne);
router.delete('/:id', requireAuth, ReminderContoller.remove);
//router.patch('/:id', requireAuth, reminderUpdateValidation, ReminderContoller.update);

export default router;