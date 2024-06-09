import { Router } from 'express';
import userRoutes from './users';
import listsRoutes from './lists';
import remindersRoutes from './reminders';

const router = Router({strict: true});

router.use('/users', userRoutes);
router.use('/lists', listsRoutes);
router.use('/lists/:listId/reminders', remindersRoutes);

export default router;