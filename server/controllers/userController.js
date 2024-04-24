import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';




// login user...
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password); // Ensure User.login is properly implemented
        const token = createToken(user._id); // Ensure createToken is implemented correctly
        const maxAge = 3 * 24 * 60 * 60; // maxAge in seconds for 3 days
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: maxAge * 1000 // convert to milliseconds
        // });

        // Optionally log the token for debugging (remove in production)
        console.log('Token:', token);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup user...
export const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        console.log(cookie)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// jwt token...
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
