import mongoose from "mongoose";
const Schema = mongoose.Schema
const reservationSchema = new Schema({
    user_id:{
<<<<<<< HEAD
        type: String,
=======
>>>>>>> 6b0289282b61a2d73719b2743bd37a38f8210a96
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    movie_id:{
<<<<<<< HEAD
       type: String,
=======
>>>>>>> 6b0289282b61a2d73719b2743bd37a38f8210a96
       type: mongoose.Schema.Types.ObjectId,
       ref: 'movies',
       required: true 
    }
})
export default mongoose.model('Reservation', reservationSchema)