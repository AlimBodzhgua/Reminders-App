import { Router } from 'express';
import {
	allListsUpdateValidation,
	listCreateValidation,
	listUpdateValidation,
} from '../validations/validations';
import * as ListController from '../controllers/ListController';
import requireAuth from '../middleware/requireAuth';

const router = Router();

// /lists
router.get('/', requireAuth, ListController.getAll);
router.get('/:id', requireAuth, ListController.getOne);
router.post('/', requireAuth, listCreateValidation, ListController.create);
router.delete('/:id', requireAuth, ListController.remove);
router.patch('/:id', requireAuth, listUpdateValidation, ListController.update);
router.post('/all', requireAuth, allListsUpdateValidation, ListController.updateAll);

export default router;