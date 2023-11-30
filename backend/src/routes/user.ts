import { Router } from 'express';
import { listUsers, getUser, updateUser, deleteUser, uploadImage } from '../controller/user';
import { UserMiddleware, AuthenticationsMiddleware, UploadsMiddleware } from '../middleware';

const router = Router();
const { inspectUpdateUser } = UserMiddleware;
const { authorize } = AuthenticationsMiddleware;

router.post('/logout');
router.post('/refresh');
router.get('/', listUsers);
router.get('/:userId', getUser);
router.put('/:userId', [authorize(['super', 'admin']), inspectUpdateUser], updateUser);
router.delete('/:userId', [authorize(['super', 'admin'])], deleteUser);
router.put('/:userId/upload', UploadsMiddleware.single('image'), uploadImage);

export default router;
