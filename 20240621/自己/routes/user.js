import { Router } from 'express'
import { create, addCart } from '../controllers/user.js'

const router = new Router()

router.post('/', create)
router.post('/:uid/cart', addCart)

export default router
