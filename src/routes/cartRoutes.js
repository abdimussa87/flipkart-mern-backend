import express from 'express';
import { addItemToCart } from '../controller/cartController.js';
import { isAuthorized, isUser } from '../middlewares/middleware.js';

const router = express.Router();

router.post('/user/cart', isAuthorized, isUser, addItemToCart)

export default router;