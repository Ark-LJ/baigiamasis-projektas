import Movies from '../models/moviesModel.js';
import mongoose from 'mongoose';


// GET - paimti visus movie...
export const getMovies = async (req, res) => {
    // const user_id = req.user._id
    const filmai = await Movies.find({})
    res.status(200).json(filmai)
}


// GET - paimti vieną movie...
export const getMovie = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    const filmas = await Movies.findById(id)
    if(!filmas) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    res.status(200).json(filmas)
}
 

// POST - sukurti naują movie...
export const createMovie = async (req, res) => {
    const {url, title, description, short_description, release_year, genres, imdb_rating, director, cast} = req.body

    let emptyFields = []

    if(!title) {emptyFields.push('title')}
    if(!description) {emptyFields.push('description')}
    if(!release_year) {emptyFields.push('release_year')}
    if(!genres) {emptyFields.push('genres')}
    if(!imdb_rating) {emptyFields.push('imdb_rating')}
    if(!director) {emptyFields.push('director')}
    if(!cast) {emptyFields.push('cast')}
    if(!url) {emptyFields.push('url')}
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Prašome užpildyti visus laukelius', emptyFields})
    }

    try {
        // const user_id = req.user._id
        const filmas = await Movies.create({url, title, description, short_description, release_year, genres, imdb_rating, director, cast})
        res.status(200).json(filmas)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}


// PATCH - redaguoti vieną movie...
export const updateMovie = async (req, res) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    const filmas = await Movies.findOneAndUpdate({_id: id}, {...req.body})
    if(!filmas) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    res.status(200).json(filmas)
}


// DELETE - ištrinti vieną movie...
export const deleteMovie = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    const filmas = await Movies.findOneAndDelete({_id: id})
    if(!filmas) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    res.status(200).json(filmas)
}
