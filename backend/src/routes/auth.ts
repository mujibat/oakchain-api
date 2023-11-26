import { Router } from 'express';
import { createUser, getOTP, logIn } from '../controller/user';
import { UserMiddleware } from '../middleware';

const { inspectUserOnboarding, inspectCreateUser } = UserMiddleware;

const router = Router();

router.post('/login', [inspectUserOnboarding], logIn);
router.post('/otp', [inspectUserOnboarding], getOTP);
router.post('/register', [inspectCreateUser], createUser);

export default router;
