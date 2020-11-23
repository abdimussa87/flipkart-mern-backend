import express from 'express';
import { createCategory, getCategories } from '../controller/categoryController.js'
import { isAdmin, isAuthorized } from '../middlewares/middleware.js'

const router = express.Router();

router.post('/categories', isAuthorized, isAdmin, createCategory)
router.get('/categories', getCategories)
export default router;