import Reservation from '../models/reservationModel.js'
import mongoose from 'mongoose'

// GET - paimti visus userio rezervations
export const getReservations = async (req, res) => {
    // const user_id = req.user._id
    const reservations = await Reservation.find({})
    res.status(200).json(reservations)
}

// GET - paimti viena userio rezervation
export const getReservation = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    const reservations = await Reservation.findById(id)
    if(!reservations) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    res.status(200).json(reservations)
}

// POST - sukurti rezervacija
export const createReservation = async (req, res) => {
        const { user_id, movie_id } = req.body
    
        try {
            const newReservation = new Reservation({
                user_id,
                movie_id
            })
            
            const savedReservation = await newReservation.save()
            res.status(201).json(savedReservation)
        } catch (error) {
            res.status(400).json({ message: "Error creating reservation", error: error.toString() })
        }
    }


// PATCH - pakoreguoti rezervacija
export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, update, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({ message: "Error updating reservation", error: error.toString() });
    }
}

// DELETE - istrinti rezervacija
export const deleteReservation = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    const rezervacija = await Reservation.findOneAndDelete({_id: id})
    if(!rezervacija) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    res.status(200).json(rezervacija)
}
