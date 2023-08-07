import { Router } from 'express'
import { signinUser, updateUser } from '../controllers/auth.js'
const router = Router()

router.route('/auth').get(signinUser).put(updateUser)
export default router
