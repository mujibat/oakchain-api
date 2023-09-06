import { Router } from 'express'
import { signinUser, updateUser } from '../controllers/auth.js'
import { fetchNews } from '../controllers/news.js'
import { fetchAllArticles, saveArticles, fetchSingleArticle } from '../controllers/articles.js'
import { fetchCryptoData } from '../controllers/cryptoUpdates.js'

const router = Router()

router.route('/auth').post(signinUser).put(updateUser)
router.get('/news', fetchNews)
router.post('/articles', saveArticles)
router.get('/articles', fetchAllArticles)
router.get('/articles/:id', fetchSingleArticle)
router.get('/crypto-update', fetchCryptoData)



router.get('/status', (req, res) => {
    return res.json('Oak chain-status')
})

export default router
