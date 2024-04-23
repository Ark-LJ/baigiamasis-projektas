import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const router = express.Router()

router.post('/', loginUser)
router.post('/signup', signupUser)

export default router