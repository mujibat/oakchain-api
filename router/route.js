import { Router } from 'express'
import { signinUser, updateUser } from '../controllers/auth.js'
const router = Router()

router.route('/auth').post(signinUser).put(updateUser)
router.get('/status', (req, res) => {
    return res.json('Oak chain-status')
})

export default router
