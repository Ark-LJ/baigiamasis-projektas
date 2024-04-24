import express from 'express';
import * as controller from '../controllers/controller.js';

const router = express.Router()

router.get('/', controller.getMovies) 
router.get('/:id', controller.getMovie) 
router.post('/', controller.createMovie)
router.patch('/:id', controller.updateMovie)
router.delete('/:id', controller.deleteMovie)


export default router
