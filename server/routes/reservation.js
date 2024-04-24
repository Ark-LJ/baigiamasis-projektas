import express from 'express';
import * as controller from '../controllers/reservationController.js';


const router = express.Router()

router.get('/', controller.getReservations)
router.get('/:id', controller.getReservation)
router.post('/', controller.createReservation)
router.patch('/:id', controller.updateReservation)
router.delete('/:id', controller.deleteReservation)


export default router
