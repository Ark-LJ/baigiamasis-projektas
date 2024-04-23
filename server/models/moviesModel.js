import mongoose from "mongoose";

const Schema = mongoose.Schema
const moviesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    description: {
        type: String,
        required: true
    },
    release_year: {
=======
    description:{
        type: String,
        required: true
    },
    release_year:{
>>>>>>> 6b0289282b61a2d73719b2743bd37a38f8210a96
        type: Number,
        required: true,
    },
    genres: {
        type: [String],
        required: true
    },
<<<<<<< HEAD
    imdb: {
=======
    imdb:{
>>>>>>> 6b0289282b61a2d73719b2743bd37a38f8210a96
        type: Number,
        required: true,
    },
    director: {
        type: [String],
        required: true
    },
    cast: {
        type: [String],
        required: true
    }
})


export default mongoose.model('Movies', moviesSchema)