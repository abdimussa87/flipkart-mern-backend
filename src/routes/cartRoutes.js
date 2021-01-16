import express from 'express';
import { addItemToCart, getCart, removeFromCart } from '../controller/cartController.js';
import { isAuthorized, isUser } from '../middlewares/middleware.js';

const router = express.Router();

router.post('/user/cart', isAuthorized, isUser, addItemToCart)
router.get('/user/cart', isAuthorized, isUser, getCart)
router.delete('/user/cart/:id', isAuthorized, isUser, removeFromCart)



export default router;