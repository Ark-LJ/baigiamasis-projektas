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
//     const token = req.cookies.jwt
//     if(token){
//         jwt.verify(token, 'secret', (err, decodedToken) =>{
//             if(err){
//                 console.log(err.message)
//                 res.redirect('/')
//             } else {
//                 next()
//             }
//             })
//             } else {
//             res.redirect('/')
//     }
// }

// export default {requireAuth, checkUser}
