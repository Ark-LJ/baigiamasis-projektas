import mongoose from "mongoose";

const Schema = mongoose.Schema
const reservationSchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    movie_id:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'movies',
       required: true 
    }
})

export default mongoose.model('Reservation', reservationSchema)