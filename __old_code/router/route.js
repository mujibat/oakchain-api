import { Router } from 'express'
import { signinUser, updateUser, getLoggedinUser } from '../controllers/auth.js'
import { fetchNews } from '../controllers/news.js'
import { fetchAllArticles, saveArticles, fetchSingleArticle } from '../controllers/articles.js'
import { fetchCryptoData } from '../controllers/cryptoUpdates.js'
import authenticateToken from '../middleware/index.js'

const router = Router()
router.route('/auth').post(signinUser)
router.put('/auth', authenticateToken, updateUser)
router.get('/user', authenticateToken, getLoggedinUser)
router.get('/news', authenticateToken, fetchNews)
router.post('/articles', authenticateToken, saveArticles)
router.get('/articles', authenticateToken, fetchAllArticles)
router.get('/articles/:id', authenticateToken, fetchSingleArticle)
router.get('/crypto-update', authenticateToken, fetchCryptoData)

router.get('/status', (req, res) => {
    return res.json('Oak chain-status')
})

export default router
