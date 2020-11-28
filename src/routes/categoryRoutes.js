import express from 'express';
import { createCategory, getCategories } from '../controller/categoryController.js'
import { isAdmin, isAuthorized } from '../middlewares/middleware.js'
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post('/categories', isAuthorized, isAdmin, upload.single('categoryImage'), createCategory)
router.get('/categories', getCategories)
export default router;