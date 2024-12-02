import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['ADMIN', 'MANAGER']), PaymentController.getAll);
router.get('/:id', authorize(['ADMIN', 'MANAGER']), PaymentController.getById);
router.post('/', authorize(['ADMIN']), PaymentController.create);
router.post('/callback', PaymentController.processCallback);

export default router;