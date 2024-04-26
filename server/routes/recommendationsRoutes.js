import express from 'express';
import * as controller from '../controllers/recommendedController.js';

const router = express.Router()

router.get('/', controller.getRecommendedMovies) 

export default router