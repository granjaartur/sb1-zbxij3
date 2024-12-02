import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['ADMIN', 'MANAGER']), MemberController.getAll);
router.get('/:id', authorize(['ADMIN', 'MANAGER']), MemberController.getById);
router.post('/', authorize(['ADMIN']), MemberController.create);
router.put('/:id', authorize(['ADMIN']), MemberController.update);
router.delete('/:id', authorize(['ADMIN']), MemberController.delete);

export default router;