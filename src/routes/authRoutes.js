import express from 'express';
import { signin, signup, isAuthorized } from '../controller/authController.js'
import { signupValidator, signinValidator } from '../validators/authValidator.js';
import { isRequestValidated } from '../validators/authValidator.js'

const router = express.Router();

router.post('/signup', signupValidator, isRequestValidated, signup);

router.post('/signin', signinValidator, isRequestValidated, signin);

router.post('/profile', isAuthorized, (req, res) => {
    res.status(200).json({ userProfile: req.userId })

});

export default router;