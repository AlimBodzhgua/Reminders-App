import { Router, Request, Response } from 'express';
import { loginValidation, registerValidation } from '../validations/validations';
import checkAuth from '../utils/checkAuth';
import * as UserController from '../controllers/UserController';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
	return res.send({'message': 'user main page'});
})
router.get('/auth/me', checkAuth, UserController.getMe);
router.post('/auth/login', loginValidation, UserController.login);
router.post('/auth/register', registerValidation, UserController.register);

export default router;