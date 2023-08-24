import { Router } from 'express'
import { signinUser, updateUser } from '../controllers/auth.js'
import { fetchNews } from '../controllers/news.js'
import { fetchAllArticles } from '../controllers/articles.js'

const router = Router()

router.route('/auth').post(signinUser).put(updateUser)
router.get('/news', fetchNews)
router.get('/articles', fetchAllArticles)

router.get('/status', (req, res) => {
    return res.json('Oak chain-status')
})

export default router
