import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


// login user...
export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token, role: user.role})
        console.log(user.role)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user...
export const signupUser = async (req, res) => {
    const {email, password, role} = req.body
    try {
        const user = await User.signup(email, password, role)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// jwt token...
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}