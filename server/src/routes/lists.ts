import { Router } from 'express';
import { listCreateValidation, listUpdateValidation } from '../validations/validations';
import * as ListController from '../controllers/ListController';
import requireAuth from '../utils/requireAuth';

const router = Router();

router.get('/', requireAuth, ListController.getAll);
router.get('/:id', requireAuth, ListController.getOne);
router.post('/', requireAuth, listCreateValidation, ListController.create);
router.delete('/:id', requireAuth, ListController.remove);
router.patch('/:id', requireAuth, listUpdateValidation, ListController.update);

export default router;