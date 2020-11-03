import express from 'express';
import { sigin, signup, isAuthorized } from '../controller/authController.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', sigin);

router.post('/profile', isAuthorized, (req, res) => {
    res.status(200).json({ userProfile: req.userId })

});

export default router;