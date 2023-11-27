import { Router } from 'express';
import user from './user';
import auth from './auth';
import { AuthenticationsMiddleware } from '../middleware';

const { authenticate, authorize } = AuthenticationsMiddleware;
const router = Router();

router.use('/auth', auth);
router.use('/user', authenticate, user);

export default router;
