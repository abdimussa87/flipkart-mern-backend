import express from 'express';
import { signin, signup } from '../../controller/admin/adminAuthController.js'
import { isAuthorized } from '../../middlewares/middleware.js'

import { signupValidator, signinValidator } from '../../validators/authValidator.js';
import { isRequestValidated } from '../../validators/authValidator.js'
const router = express.Router();

router.post('/admin/signup', signupValidator, isRequestValidated, signup);

router.post('/admin/signin', signinValidator, isRequestValidated, signin);

// router.post('/profile', isAuthorized, (req, res) => {
//     res.status(200).json({ userProfile: req.userId })

// });

export default router;