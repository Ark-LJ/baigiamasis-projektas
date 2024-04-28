import express from 'express';
import * as controller from '../controllers/reservationController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()
router.use(authMiddleware)

router.get('/', controller.getReservations)
router.get('/admin', controller.getReservationsAdmin)
router.get('/:id', controller.getReservation)
router.post('/', controller.createReservation)
router.patch('/:id', controller.updateReservation)
router.delete('/:id', controller.deleteReservation)


export default router