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
    },
    pickup_date: {
        type: Date,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    status: {
        type: [String],
        required: true,
        default: 'Pending'
    },
    pickup_location: {
        type: String,
        required: true
    }
}, {timestamps: true})
export default mongoose.model('Reservation', reservationSchema)