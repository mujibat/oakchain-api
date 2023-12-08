import { Router } from 'express';
import user from './user';
import auth from './auth';
import blog from './blog';
import issues from './issue';
import { AuthenticationsMiddleware } from '../middleware';

const { authenticate, authorize } = AuthenticationsMiddleware;
const router = Router();

router.use('/auth', auth);
router.use('/user', authenticate, user);
router.use('/issues', authenticate, issues);
router.use('/blog', authenticate, blog);

export default router;
