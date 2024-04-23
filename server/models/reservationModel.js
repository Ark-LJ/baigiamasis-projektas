import mongoose from "mongoose";

const Schema = mongoose.Schema
const reservationSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    movie_id:{
       type: String,
       required: true 
    }
})

export default mongoose.model('Reservation', reservationSchema)