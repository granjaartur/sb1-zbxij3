import { Router } from 'express';
import { GroupController } from '../controllers/group.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['ADMIN', 'MANAGER']), GroupController.getAll);
router.post('/', authorize(['ADMIN']), GroupController.create);
router.post('/:id/members', authorize(['ADMIN']), GroupController.addMembers);
router.delete('/:id/members', authorize(['ADMIN']), GroupController.removeMembers);

export default router;