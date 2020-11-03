import express from 'express';
import { sigin, signup, isAuthorized } from '../../controller/admin/adminAuthController.js'

const router = express.Router();

router.post('/admin/signup', signup);

router.post('/admin/signin', sigin);

// router.post('/profile', isAuthorized, (req, res) => {
//     res.status(200).json({ userProfile: req.userId })

// });

export default router;