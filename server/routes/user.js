import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const router = express.Router()

<<<<<<< HEAD
router.post('/', loginUser)
=======
router.post('/login', loginUser)
>>>>>>> 6b0289282b61a2d73719b2743bd37a38f8210a96
router.post('/signup', signupUser)

export default router