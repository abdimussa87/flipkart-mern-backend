import express from 'express'
import { getInitialData } from '../../controller/admin/initialData.js';

const router = express.Router();

router.get('/admin/initialData', getInitialData);
export default router;