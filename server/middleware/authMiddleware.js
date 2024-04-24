// import jwt from 'jsonwebtoken'
// import User from '../models/userModel.js'

// const checkUser = (req, res, next) =>{
//     const token = req.cookies.jwt
//     if(token){
//         jwt.verify(token, 'secret', async(err, decodedToken) =>{
//             if(err){
//                 res.locals.user = null
//                 next()
//             } else {
//                 let user = await User.findById(decodedToken.id)
//                 console.log('Decoded Token:', decodedToken)
//                 res.locals.user = user
//                 next()
//             }
            
//         })
//     } else {
//         res.locals.user = null
//         next()
//     }
// }

// const requireAuth = (req, res, next) => {
//     // Try to get the token from cookies first
//     let token = req.cookies.jwt;

//     // If no token in cookies, try to get it from the Authorization header
//     if (!token && req.headers.authorization) {
//         // Expected header format: "Bearer TOKEN"
//         const parts = req.headers.authorization.split(' ');
//         if (parts.length === 2 && parts[0] === 'Bearer') {
//             token = parts[1];
//         }
//     }

//     // Verify token if one was found
//     if (token) {
//         jwt.verify(token, 'secret', (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect('/login');
//             } else {
//                 next();
//             }
//         });
//     } else {
//         res.redirect('/api/movies');
//     }
// };

// export {requireAuth, checkUser}


import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
const authMiddleware = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) {
        return res.status(401).json({error: 'Autorizavimo token yra privalomas'})
    }
    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('id')
        next()
    }
    catch(error) {
        console.log(error)
        res.status(401).json({error: 'Užklausa nepatvirtinta.'})
    }
}
export default authMiddleware
