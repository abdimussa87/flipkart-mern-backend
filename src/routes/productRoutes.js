import express from 'express';
import { createProduct, getProducts, getProductsBySlug } from '../controller/productController.js';
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

router.post('/products', isAuthorized, isAdmin, upload.array('productPicture'), createProduct)
router.get('/products', getProducts)
router.get('/products/:slug', getProductsBySlug)
export default router;