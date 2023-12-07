import { Router } from 'express';
import { createUser, getOTP, logIn } from '../controller/user';
import { UserMiddleware } from '../middleware';

const { inspectCreateUser } = UserMiddleware;

const router = Router();

router.post('/register', [inspectCreateUser], createUser);
router.post('/otp', getOTP);
router.post('/login', logIn);

export default router;
