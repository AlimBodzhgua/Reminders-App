import { Router } from 'express';
import userRoutes from './users';
import remindersRoutes from './reminders';

const router = Router({strict: true});

router.use('/users', userRoutes)
router.use('/reminders', remindersRoutes);

export default router;