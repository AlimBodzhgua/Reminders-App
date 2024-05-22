import { Router } from 'express';
import { reminderCreateValidation, reminderUpdateValidation } from '../validations/validations';
import * as ReminderContoller from '../controllers/ReminderContoller';
import checkAuth from '../utils/checkAuth';

const router = Router();

// /reminders
router.post('/', checkAuth, reminderCreateValidation, ReminderContoller.create);
router.get('/', checkAuth, ReminderContoller.getAll);
router.get('/:id', checkAuth, ReminderContoller.getOne);
router.delete('/:id', checkAuth, ReminderContoller.remove);
router.patch('/:id', checkAuth, reminderUpdateValidation, ReminderContoller.update);

export default router;