import Drafts from '../models/draftModel.js';
import mongoose from 'mongoose';


// GET - paimti visus movie...
export const getDrafts = async (req, res) => {
    // const user_id = req.user._id
    const drafts = await Drafts.find({})
    res.status(200).json(drafts)
}


// GET - paimti vieną movie...
export const getDraft = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    const draft = await Drafts.findById(id)
    if(!draft) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    res.status(200).json(draft)
}
 

// POST - sukurti naują movie...
export const createDraft = async (req, res) => {
    const {status, url, title, description, release_year, genres, imdb_rating, director, cast} = req.body

    let emptyFields = []

    if(!title) {emptyFields.push('title')}
    if(!description) {emptyFields.push('description')}
    if(!release_year) {emptyFields.push('release_year')}
    if(!genres) {emptyFields.push('genres')}
    if(!imdb_rating) {emptyFields.push('imdb_rating')}
    if(!director) {emptyFields.push('director')}
    if(!cast) {emptyFields.push('cast')}
    if(!url) {emptyFields.push('url')}
    if(!status) {emptyFields.push('status')}
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Prašome užpildyti visus laukelius', emptyFields})
    }

    try {
        // const user_id = req.user._id
        const draftai = await Drafts.create({status, url, title, description, release_year, genres, imdb_rating, director, cast})
        res.status(200).json(draftai)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}


// PATCH - redaguoti vieną movie...
export const updateDraft = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    const draftas = await Movies.findOneAndUpdate({_id: id}, {...req.body})
    if(!draftas) {
        return res.status(404).json({error: 'Tokio filmo nėra.'})
    }
    res.status(200).json(draftas)
}


// DELETE - ištrinti vieną movie...
export const deleteDraft = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio drafto nėra.'})
    }
    const draftas = await Drafts.findOneAndDelete({_id: id})
    if(!draftas) {
        return res.status(404).json({error: 'Tokio drafto nėra.'})
    }
    res.status(200).json(draftas)
}
