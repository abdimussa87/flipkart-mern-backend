import express from 'express'
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { createPage, getPage } from '../../controller/admin/pageController.js';
import { isAdmin, isAuthorized } from '../../middlewares/middleware.js';

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

router.post('/admin/pages', isAuthorized, isAdmin,
    upload.fields(
        [
            { name: 'banners' }, { name: 'products' }
        ]
    )
    , createPage);

router.get('/pages/:category/:type', getPage);
export default router;