import { Router } from 'express'
import { create, addCart, getId } from '../controllers/user.js'

const router = new Router()

router.post('/', create)
router.post('/:uid/cart', addCart)
router.get('/:uid', getId)

export default router
