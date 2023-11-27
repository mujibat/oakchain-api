import { Router } from 'express';
import { createUser, getOTP, logIn } from '../controller/user';
import { UserMiddleware } from '../middleware';

const { inspectCreateUser } = UserMiddleware;

const router = Router();

router.post('/login', logIn);
router.post('/otp', getOTP);
router.post('/register', [inspectCreateUser], createUser);

export default router;
