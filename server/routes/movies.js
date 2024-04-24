import express from 'express';
import * as controller from '../controllers/controller.js';
import {requireAuth} from '../middleware/authMiddleware.js'

const router = express.Router()
router.use(requireAuth)
router.get('/', controller.getMovies) 
router.get('/:id', controller.getMovie) 
router.post('/', controller.createMovie)
router.patch('/:id', controller.updateMovie)
router.delete('/:id', controller.deleteMovie)


export default router
