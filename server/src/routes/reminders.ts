import { Router } from 'express';
import { reminderCreateValidation } from '../validations/validations';
import * as RemindersContoller from '../controllers/RemindersContoller';
import checkAuth from '../utils/checkAuth';

const router = Router();


// /reminders
router.post('/', checkAuth, reminderCreateValidation, RemindersContoller.create);
router.get('/', RemindersContoller.getAll);
//router.get('/:id', RemindersContoller.getOne);
//router.delete('/:id', checkAuth, RemindersContoller.remove);
//router.patch('/:id', checkAuth, RemindersContoller.update);




export default router;