import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN']), ServiceController.create);
router.put('/:id', authorize(['ADMIN']), ServiceController.update);
router.get('/category/:categoryId', authorize(['ADMIN', 'MANAGER']), ServiceController.getByCategory);

export default router;